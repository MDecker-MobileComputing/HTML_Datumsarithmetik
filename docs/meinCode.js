
/* This file is licensed under the terms of the BSD 3-Clause License. */


/* Datums-Muster für ;oment.js zum Formatieren und Parsen von Datums-Werten. */
const DATUMS_MUSTER = "YYYY-MM-DD";

/*
 * Funktion liefert heutiges Datum in Format für Datums-Element zurück.
 */
function getDatumHeute() { "use strict";

    return moment().format( DATUMS_MUSTER );
}

/*
 * Funktion liefert morgiges Datum in Format für Datums-Element zurück.
 */
function getDatumMorgen() { "use strict";

    return moment().add( 1, "days" ).format( DATUMS_MUSTER );
}


/*
 * Funktion berechnet die Differenz in Tagen zwischen zwei Datums-Werten und gibt diesen Wert zurück.
 * Die Differenz in Tages ist nie ein negativer Wert, d.h. es wird ggf. das Minus-Zeichen abgeschnitten.
 */
function berechneDifferenz(datum1, datum2) { "use strict";
    
    let moment1 = moment( datum1, DATUMS_MUSTER );
    let moment2 = moment( datum2, DATUMS_MUSTER );

    let differenz = moment1.diff( moment2, "days" ); 
    // ohne Angabe einer Einheit würde die Differenz in Millisekunden zurückgegeben.

    return Math.abs( differenz );
}


/*
 * Event-Handler für den "Berechnen"-Button.
 */
function onButtonBerechnen() { "use strict";

    let datum1 = $( "#datum-1" ).val();
    let datum2 = $( "#datum-2" ).val();
    
    let differenzTage = berechneDifferenz( datum1, datum2 );

    $( "#ergebnis" ).text( `Differenz: ${differenzTage} Tage` );
}


/*
 * Event-Handler für Button "Zurücksetzen"; wird aber auch zur Initialisierung
 * der Applikation aufgerufen.
 */
function onButtonZuruecksetzen() { "use strict";

    $( "#datum-1" ).val( getDatumHeute()  );
    $( "#datum-2" ).val( getDatumMorgen() );

    $( "#ergebnis" ).text("");
}


/*
 * Event-Handler für "Datei fertig geladen".
 */
function onSeiteGeladen() { "use strict";

    $( "#buttonBerechnen"     ).click( onButtonBerechnen     );
    $( "#buttonZuruecksetzen" ).click( onButtonZuruecksetzen );

    onButtonZuruecksetzen();

    console.log( "Funktion onSeiteGeladen() abgearbeitet." );
}


$( document ).on( "pagecreate", onSeiteGeladen );
