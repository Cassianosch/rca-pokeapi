import { PokemonData } from '../../interfaces/pokemon';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';


interface PokemonServiceProps {
    _getOne(pokemonName: string): Promise<PokemonData>;
}

const _getOne = async (pokemonName: string): Promise<PokemonData> => {
    try {
        const { data } = await api.get(`pokemon/${pokemonName.toLowerCase()}`);

        return data;
    } catch (err) {
        throw serviceErrorHandler();
    }
};

export const pokemonServices = (): PokemonServiceProps => ({
    _getOne,
});
