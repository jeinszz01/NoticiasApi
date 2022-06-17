import axios from 'axios'
import { useState, useEffect, createContext } from 'react'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {

    const [ categoria, setCategoria ] = useState('general')
    const [ noticias, setNoticias ] = useState([])
    const [ pagina, setPagina ] = useState(1)
    const [ totalNoticias, setTotalNoticias ] = useState(0)

    //Consulta a la Api 
    useEffect(() => {
        const consultarApi = async() => {
            const url = `https://newsapi.org/v2/top-headlines?country=AR&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
            const { data } = await axios(url)
            //console.log(data)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
            setPagina(1) //cada vez q cambiemos de categoria se volverá a la pagina 1.

        }
        consultarApi()
    }, [categoria])

    //consulta a la Api por la pagina
    useEffect(() => {
        const consultarApi = async() => {
            const url = `https://newsapi.org/v2/top-headlines?country=AR&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
            const { data } = await axios(url)
            //console.log(data)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
        }
        consultarApi()
    }, [pagina])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handlechangePagina = (e, xd) => {
        //console.log(e.target.value)//.value no mostrara nada ya q no es un input o button y xlo tanto no tiene value a cambio
        //console.log(e.target.textContent) //como es una paginacion la flecha no muestra un valor 
        //console.log(xd) // toma dos valores el segundo te devuelve el valor actual o seleccionado.
        setPagina(xd)
    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handlechangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}


export {
    NoticiasProvider
}

export default NoticiasContext