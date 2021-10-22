export interface PokemonAbilityData {
    ability: {
        name: string;
    }

}
export interface PokemonData {
    map(arg0: (el: any, i: any) => JSX.Element): import("react").ReactNode;
    sort(arg0: (a: any, b: any) => 1 | -1);
    abilities: PokemonAbilityData[];
    forms: [
        {
            name: string;
        }
    ]
}

