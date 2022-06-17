import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import useNoticias from "../hooks/useNoticias"
import Noticia from "./Noticia"

const ListadoNoticias = () => {
    const { noticias, totalNoticias, handlechangePagina, pagina } = useNoticias()
    //console.log(totalNoticias)

    const totalPaginas = Math.ceil(totalNoticias / 20) // Math.ceil, entre otras no ayuda a redondear un numero hacia arriba y nos muetra el entero. ejem(2.4) = 3
    //console.log(totalPaginas)
    return (
        <>
            <Typography textAlign={'center'} marginY={5} variant="h3" component={'h2'} >
                Últimas Noticias
            </Typography>

            <Grid
                container
                spacing={2}
            >
                {noticias.map(noticia => (
                    <Noticia 
                        key={noticia.url}
                        noticia={noticia}
                    />
                ))}
            </Grid>
            
            
            <Stack spacing={2} direction='row' alignItems='center' justifyContent='center' sx={{marginY: 5}} >
                <Pagination
                    count={totalPaginas}
                    color="primary"
                    onChange={handlechangePagina}
                    page={pagina}
                /> {/* count es el total de paginas q se crearan, page es otro prop q actualizará el número de pagina de acuerdo a nuestro provider */}
            </Stack>
        </>
    )
}

export default ListadoNoticias