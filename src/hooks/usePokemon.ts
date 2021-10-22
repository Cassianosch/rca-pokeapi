import { useCallback, useState } from 'react';
import { PokemonData } from '../interfaces/pokemon';
import { pokemonServices } from '../services/pokemon';
import useCustomToast from './useCustomToast';

interface usePokemonHookData {
    row: PokemonData;
    handleGetData(pokemon: string): Promise<void>;
}

export default (): usePokemonHookData => {
    const [row, setRow] = useState<PokemonData>();

    const { showErrorToast } = useCustomToast();

    const { _getOne } = pokemonServices();

    const handleGetData = useCallback(async (pokemon: string) => {
        try {
            const values = await _getOne(pokemon);

            setRow(values);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getOne, showErrorToast]);


    return {
        row,
        handleGetData,
    };
};
