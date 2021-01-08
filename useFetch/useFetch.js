import { useEffect, useRef, useState } from 'react'

// Utilizando el API de Breaking Bad.

export const useFetch = ( url ) => {
    
    // La idea de este ref es que mantenga la referencia cuando el componente esta vivo o no ( montado/desmontado ).
    const isMounted = useRef( true );

    const [state, setState] = useState( { 
        data: null,
        loading: true,
        error: null 
    } );

    useEffect(() => {
        
        // El return se ejecuta cuando el componente se desmonte.
        return () => {
            isMounted.current = false;
        }

    }, []);

    // Solo se va a ejecutar cuando cambiemos la url.
    useEffect( () => {

        setState({
            data: null,
            loading: true,
            error: null
        })

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                
                    if( isMounted.current ) {
                        
                        setState({
                            loading: false,
                            error: null,
                            data
                            // data: data
                        });

                    } else {
                        console.log('setState no se llamó');
                    }
                
            })
            .catch( () => {
                setState( {
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info.'
                });
            });

    }, [ url ] );

    return state;
}
