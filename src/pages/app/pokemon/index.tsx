import React, { useState, useCallback, useMemo } from 'react';
import { Flex, Heading, Grid, GridItem, Button, Text, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../../components/Form/Input';
import { Container } from '../../../components/Layout';
import usePokemon from '../../../hooks/usePokemon';

type PokemonSolo = {
    name: string;
}
const pokemonFormSchema: yup.SchemaOf<PokemonSolo> = yup.object().shape({
    name: yup.string().required('Name is mandatory.'),
});

export const PokemonPage = (): JSX.Element => {
    const [sortByOrd, setSortByOrd] = useState<'asc' | 'desc'>('asc');

    const { row, handleGetData } = usePokemon();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PokemonSolo>({
        resolver: yupResolver(pokemonFormSchema),
    });
    const onSubmit = useCallback<SubmitHandler<PokemonSolo>>(
        async (data) => {
            try {
                await handleGetData(data.name);
                reset();
            } catch (err) {
                toast({
                    status: 'error',
                    title: `Erro`,
                    description: err,
                    isClosable: true,
                });
            }
        },
        [handleGetData, reset, toast],
    );

    useMemo(
        () => {
            row?.abilities.sort((a, b) => {
                if (sortByOrd === 'asc')
                    return a.ability.name > b.ability.name ? 1 : -1;
                return a.ability.name > b.ability.name ? -1 : 1;
            })
        },
        [row, sortByOrd],
    );

    const toggleSort = useCallback(
        () => {
            setSortByOrd((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        },
        [],
    );

    return (
        <Container title="PokeAPI" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Pokemon Finder</Heading>
                <Grid
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    templateColumns="repeat(2, 1fr)"
                    gridColumnGap="2"
                    gridGap="2">
                    <GridItem colSpan={{ base: 6, sm: 3 }}>
                        <FormInput
                            name="name"
                            label="Pokemon Name"
                            error={errors.name}
                            placeholder="Type the pokemon name"
                            {...register('name')}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 6, sm: 3 }}>
                        <Flex
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                            gridGap="4">
                            <Button
                                type="submit"
                                variant="form-submit"
                                isLoading={isSubmitting}>
                                <Text>Find</Text>
                            </Button>
                        </Flex>
                    </GridItem>
                </Grid>
                {
                    row ?
                        <>
                            Pokemon choosed: {row.forms[0].name}
                            <table className="table">
                                <thead>
                                    <tr className="table">
                                        <th className="table-header" >
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                title="Some title"
                                                onClick={toggleSort}
                                                onKeyPress={toggleSort}
                                            >
                                                Ability
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        row.abilities.map((el, i) => (
                                            <tr key={i} style={{ textAlign: `center` }}>
                                                <td>{el.ability.name}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                        : null}
            </Flex>
        </Container>
    );
};
