// Description de la Class Color
//
// *** Variable : ***
//
// name (string) : C'est le nom de la couleur affiché par le jeu. e.g "Rouge"
// backgroundColor(string) : Hexadecimal de la couleur de fond à affiché pour cette couleur e.g "#f54242"
// pivotHue(int) : valeur pivot de la teinte de la couleur. On y ajoute ou soustrait range pour connaitre les bornes max et min de notre intervalle de validité
// range(int): valeur à ajouter ou soustraire à pivoit pour obtenir les bornes de validité.  pivot - range donc la borne minimale, et pivot + range donne la borne maximal
// 
//
// *** Fonction : ***
// CheckIfColorCorrespond(r, g, b) : Prend en parametre trois int representant la valeur rgb de la couleur à tester. Convertie cette valeur rgb en hsl puis regarde si la valeur H (Hue, la teinte de la couleur) appartient à l'intervalle de validité.

export default class Color {

    constructor(name, backgroundColor, hsl, range) {
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.hsl = hsl;
        this.range = range;
    }

    CheckIfColorCorrespond(rgb) {
        const normalizedR = rgb[0] / 255
        const normalizedG = rgb[1] / 255
        const normalizedB = rgb[2] / 255

        console.log(normalizedR, normalizedG, normalizedB)

        let cmin = Math.min(normalizedR, normalizedG, normalizedB)
        let cmax = Math.max(normalizedR, normalizedG, normalizedB)
        let delta = cmax - cmin

        let h = 0
        let s = 0
        let l = 0

        //Pour le moment ou n'utilise que la Hue, on fera le reste si on a le temps. Mais du coup le blanc le noir
        //et les teintes de gris risque de donner des résultats inatendu. Pour changer cela il faudra prendre en compte 
        //la saturation S et la luminosité L de la couleur. Pour le moment elle ne sont pas calculé. 

        // Calculate hue
        // No difference
        if (delta == 0) {
            h = 0
            console.log("Delta 0")
        }
        // Red is max
        else if (cmax == normalizedR) {
            h = ((normalizedG - normalizedB) / delta) % 6
            console.log("cmax is red")
        }

        // Green is max
        else if (cmax == normalizedG) {
            h = (normalizedB - normalizedR) / delta + 2;
            console.log("cmax is blue")

        }
        // Blue is max
        else {
            h = (normalizedR - normalizedG) / delta + 4;
            console.log("cmax is green")
        }

        h = Math.round(h * 60);

        console.log("hue " + h);
        // Make negative hues positive behind 360°
        if (h < 0){
            h += 360;
        }

        //Calculate Lightness

        l = (cmax + cmin) / 2

        //CalculateSaturation
        if(delta===0){
            s = 0 
        }
        else{
            s = delta / (1 - Math.abs(2 * l - 1) )
        }
      

        
        let isColorCorresponding;

        if (h <= this.hsl[0] + this.range && h >= this.hsl[0] - this.range) {
            isColorCorresponding = true;
        }
        else {
            isColorCorresponding = false;
        }

        return isColorCorresponding;
    }

}