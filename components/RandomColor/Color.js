// Description de la Class Color
//
// *** Variable : ***
//
// name (string) : C'est le nom de la couleur affiché par le jeu. e.g "Rouge"
// backgroundColor(string) : Hexadecimal de la couleur de fond à affiché pour cette couleur e.g "#f54242"
// hMinMax(array) : Contient la borne Min hMinMax[0] et la borne Max hMinMax[1] de l'intervalle de validité de la Hue.
// sMinMax(array) : Contient la borne Min sMinMax[0] et la borne Max sMinMax[1] de l'intervalle de validité de la Saturation.
// lMinMax(array) : Contient la borne Min lMinMax[0] et la borne Max lMinMax[1] de l'intervalle de validité de la Lightness.
// 
//
// *** Fonction : ***
//
// CheckIfColorCorrespond(r, g, b) : Prend en parametre trois int representant la valeur rgb de la couleur à tester. 
// Convertie cette valeur rgb en hsl puis regarde si les valeurs HSL (Hue, Saturation, Lightness) appartient au intervalle de validité
// 
//

export default class Color {

    constructor(name, backgroundColor, hMinMax, sMinMax, lMinMax) {
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.hMinMax = hMinMax;
        this.sMinMax = sMinMax;
        this.lMinMax = lMinMax;
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
        }
        // Red is max
        else if (cmax == normalizedR) {
            h = ((normalizedG - normalizedB) / delta) % 6
        }

        // Green is max
        else if (cmax == normalizedG) {
            h = (normalizedB - normalizedR) / delta + 2;

        }
        // Blue is max
        else {
            h = (normalizedR - normalizedG) / delta + 4;
        }

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) {
            h += 360;
        }

        //Calculate Lightness

        l = (cmax + cmin) / 2

        //CalculateSaturation
        if (delta === 0) {
            s = 0
        }
        else {
            s = delta / (1 - Math.abs(2 * l - 1))
        }

        s = Math.round(s * 100)
        l = Math.round(l * 100)


        let isColorCorresponding = false;
        console.log(this.hMinMax, this.sMinMax, this.lMinMax)
        console.log(h, s, l)

        if (this.hMinMax[0] > this.hMinMax[1]) {

            if (((h >= this.hMinMax[0] && h <= 360) || (h >= 0 && h <= this.hMinMax[1])) &&
                s >= this.sMinMax[0] && s <= this.sMinMax[1] &&
                l >= this.lMinMax[0] && l <= this.lMinMax[1]
            ) {
                isColorCorresponding = true
            }
            else {
                isColorCorresponding = false
            }

        }
        else {

            if (h >= this.hMinMax[0] && h <= this.hMinMax[1] &&
                s >= this.sMinMax[0] && s <= this.sMinMax[1] &&
                l >= this.lMinMax[0] && l <= this.lMinMax[1]
            ) {
                isColorCorresponding = true
            }
            else {
                isColorCorresponding = false
            }

        }



        return isColorCorresponding;
    }

}