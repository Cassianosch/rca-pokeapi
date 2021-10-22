import React from 'react';
import {
    Avatar,
    Button,
    Flex,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { Logo } from '../Logo';

interface HeaderProps {
    onOpen(): void;
}

export const Header = ({ onOpen }: HeaderProps): JSX.Element => {

    const isMobile = useBreakpointValue({
        base: true,
        xs: true,
        xl: false,
    });

    const avatarSize = useBreakpointValue({
        xs: 'md',
        sm: 'lg',
    });

    return (
        <Flex
            id="header"
            direction="row"
            alignItems="center"
            p="4"
            bgColor="white">
            {isMobile && (
                <IconButton
                    icon={<HiMenu size="24" />}
                    size="sm"
                    variant="outline"
                    borderColor="pokeapi.primary.700"
                    aria-label="Menu hambúrguer"
                    transtion="all 0.4 ease"
                    _hover={{
                        bgColor: 'pokeapi.primary.700',
                        color: 'white',
                    }}
                    onClick={() => onOpen()}
                />
            )}
            <Flex flex={1} justifyContent="center">
                <Logo />
            </Flex>
            <Flex direction="row" alignItems="center" gridGap="4">
                <Text fontSize={{ xs: 'lg', sm: 'xl' }}>
                    Olá, Cassiano
                </Text>
                <Avatar name="Cassiano" size={avatarSize} />
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <IconButton
                            icon={<FaChevronDown />}
                            size="xs"
                            variant="outline"
                            borderColor="pokeapi.primary.700"
                            aria-label="Menu usuário"
                            transtion="all 0.4 ease"
                            _hover={{
                                bgColor: 'pokeapi.primary.700',
                                color: 'white',
                            }}
                        />
                    </PopoverTrigger>
                    <PopoverContent w="40">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Button variant="ghost" onClick={() => alert('Deslogou :)')}>
                                <Text>Sair</Text>
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        </Flex>
    );
};
