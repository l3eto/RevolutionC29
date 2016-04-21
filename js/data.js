var data = [
    {
      'artist':'Kike Pavón',
      'song':'La Experiencia de Adorar',
      'order':[
        'intro',
        'verse-1',
        'verse-2',
        'chorus-1',
        'intro',
        'verse-1',
        'verse-2',
        'chorus-1',
        'chorus-2',
        'bridge',
        'bridge',
        'bridge',
        'chorus-1',
        'chorus-2'
      ],
      'lyrics':{
        'verse-1':[
          {'p':'Es mejor un día en tu presencia'},
          {'p':'Que mil años fuera de ella'},
          {'p':'Pues nada se compara a ella'}
        ],
        'verse-2':[
          {'p':'Es mejor un rincón en tu casa'},
          {'p':'Que tener el mejor palacio'},
          {'p':'Mejor estar en tu regazo'}
        ],
        'chorus-1':[
          {'p':'Y adorar, desde hoy hasta la eternidad'},
          {'p':'Y en tu presencia descansar'},
          {'p':'Pues no hay mejor lugar que estar donde tú estás'}
        ],
        'chorus-2':[
          {'p':'Y habitar, bajo tus alas contemplar'},
          {'p':'Tú gran poder y tu bondad'},
          {'p':'Y disfrutar de la experiencia de adorarte Jesús'}
        ],
        'bridge':[
          {'p':'Quiero vivir en tu presencia'},
          {'p':'Quiero adorar hasta que no tenga fuerzas'}
        ]
      }
    }
    ,
    {
      'artist':'Evan Craft',
      'song':'Gracia Sublime Es',
      'order':[
        'intro',
        'verse-1',
        'verse-2',
        'chorus-1',
        'chorus-2',
        'intro',
        'verse-3',
        'verse-4',
        'chorus-1',
        'chorus-2',
        'bridge',
        'bridge',
        'bridge',
        'chorus-1',
        'chorus-2'
      ],
      'lyrics':{
        'verse-1':[
          {'p':'Quién rompe el poder del pecado'},
          {'p':'Su amor es fuerte y poderoso'},
          {'p':'El Rey de gloria, El Rey de majestad'}
        ],
        'verse-2':[
          {'p':'Conmueve el mundo con su estruendo'},
          {'p':'Y nos asombra con maravillas'},
          {'p':'El Rey de gloria, El Rey de majestad'}
        ],
        'verse-3':[
          {'p':'Pusiste en orden todo el caos'},
          {'p':'Nos adoptaste como tus hijos'},
          {'p':'El Rey de gloria, El Rey de majestad'}
        ],
        'verse-4':[
          {'p':'El que gobierna con su justicia'},
          {'p':'Y resplandece con su belleza'},
          {'p':'El Rey de gloria, El Rey de majestad'}
        ],
        'chorus-1':[
          {'p':'Gracia sublime es'},
          {'p':'Perfecto es tu amor'},
          {'p':'Tomaste mi lugar'},
          {'p':'Cargaste tu mi cruz'}
        ],
        'chorus-2':[
          {'p':'Tu vida diste ahí'},
          {'p':'Y ahora libre soy'},
          {'p':'Jesús te adoro'},
          {'p':'por lo que hiciste en mi'}
        ],
        'bridge':[
          {'p':'Digno es el Cordero de Dios'},
          {'p':'Digno es el Rey que la muerte venció'}
        ]
      }
    }
    ,
    {
      'artist':'Kike Pavón',
      'song':'En Tu Nombre',
      'order':[
        'intro',
        'verse-1',
        'verse-2',
        'pre-chorus',
        'chorus-1',
        'chorus-2',
        'intro',
        'verse-1',
        'verse-2',
        'pre-chorus',
        'chorus-1',
        'chorus-2',
        'chorus-2',
        'chorus-2'
      ],
      'lyrics':{
        'verse-1':[
          {'p':'En tu nombre hoy venimos'},
          {'p':'Estamos tan agradecidos'},
          {'p':'Y por eso levantamos la voz y el corazón a ti'}
        ],
        'verse-2':[
          {'p':'La alabanza te entregamos'},
          {'p':'Nuestro corazón postramos'},
          {'p':'Porque tú eres el motivo de nuestra adoración'}
        ],
        'pre-chorus':[
          {'p':'A nadie daremos tu gloria compartida'},
          {'p':'Pues es sólo para ti'},
          {'p':'Pues es sólo para ti'}
        ],
        'chorus-1':[
          {'p':'Levantamos nuestras manos'},
          {'p':'En tu nombre adoramos'},
          {'p':'Por quién eres, lo que has hecho y lo que harás'},
        ],
        'chorus-2':[
          {'p':'Eres rey y nos postramos'},
          {'p':'Eres Dios y proclamamos'},
          {'p':'Tu grandeza y tu bondad'},
        ]
      }
    }
    ,
    {
      'artist':'Evan Craft',
      'song':'Vives en Mí',
      'order':[
        'intro',
        'verse-1',
        'verse-2',
        'pre-chorus',
        'pre-chorus',
        'chorus-1',
        'chorus-1',
        'intro',
        'verse-2',
        'pre-chorus',
        'pre-chorus',
        'chorus-1',
        'chorus-1',
        'bridge-1',
        'bridge-1',
        'bridge-1',
        'bridge-2',
        'pre-chorus',
        'pre-chorus',
        'chorus-1',
        'chorus-1'
      ],
      'lyrics':{
        'verse-1':[
          {'p':'Al despertar te cantaré,'},
          {'p':'mis ojos en ti fijaré,'},
          {'p':'al ritmo de tu corazón'},
          {'p':'caminaré hacia tu amor.'}
        ],
        'verse-2':[
          {'p':'Tu fuego en mi interior'},
          {'p':'ardiendo está.'},
          {'p':'Salvaje amor que brillará,'},
          {'p':'esta pasión, todos verán,'},
          {'p':'tu gloria resplandecerá.'}
        ],
        'pre-chorus':[
          {'p':'Tú nunca me dejarás,'},
          {'p':'tu amor me sostendrá,'},
          {'p':'junto a mí estarás'},
          {'p':'y por siempre brillarás'}
        ],
        'chorus-1':[
          {'p':'Tú vives en mí, vives en mí,'},
          {'p':'soy tuyo para siempre.'},
          {'p':'Vives en mí, vives en mí,'},
          {'p':'soy tuyo para siempre.'}
        ],
        'bridge-1':[
          {'p':'Por siempre, por siempre,'},
          {'p':'por siempre en tu amor'}
        ],
        'bridge-2':[
          {'p':'Por siempre, por siempre,'},
          {'p':'por siempre, yo sé que...'}
        ]
      }
    }
];




var getData = function( artist , song ){
  for( i in data ){
    if( data[i].artist == artist && data[i].song == song ){
      return data[i];
    }
  }
  return null;
}
