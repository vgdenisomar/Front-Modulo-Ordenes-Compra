
import { Label } from "@mui/icons-material"
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined"
import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, Input, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { styled } from '@mui/system';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const initialProductsList = [
    { id: 1, label: 'Producto 1' },
    { id: 2, label: 'Producto 2' },
    { id: 3, label: 'Producto 3' },
    { id: 4, label: 'Producto 4' },
  ];


export default function CreateSupplyChain() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
          setProducts([...products, selectedProduct.label]);
        }
        setSelectedProduct(null);
        setOpen(false);
      };

    return (
        <div>
            <h2 className="titleCatalog"><AssignmentTurnedInOutlinedIcon /> Orden de Compra</h2>
            <Grid container spacing={3}>
                <FormGrid item xs={12} md={6}>
                    <FormLabel htmlFor="supplier" required>
                        Proveedor
                    </FormLabel>
                    <Select
                        id="supplier"
                        name="supplier"
                        type="supplier"
                        placeholder="supplier"
                        autoComplete="Proveedor"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={12} md={6}>
                    <FormLabel htmlFor="dept-sol" required>
                        Departamento solicitante
                    </FormLabel>
                    <Select
                        id="dept-sol"
                        name="dept-sol"
                        type="dept-sol"
                        placeholder="Departamento solicitante"
                        autoComplete="Departamento solicitante"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel htmlFor="subject" required>
                        Asunto
                    </FormLabel>
                    <OutlinedInput
                        id="subject"
                        name="subject"
                        type="subject"
                        placeholder="Asunto"
                        autoComplete="Asunto"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={3}>
                    <FormLabel htmlFor="paymentmethod" required>
                        Forma de Pago
                    </FormLabel>
                    <Select
                        id="paymentmethod"
                        name="paymentmethod"
                        type="paymentmethod"
                        placeholder="Forma de pago"
                        autoComplete="Forma de pago"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={3}>
                    <FormLabel htmlFor="date" required>
                        Fecha
                    </FormLabel>
                    <OutlinedInput
                        id="date"
                        name="date"
                        type="date"
                        placeholder="Fecha"
                        autoComplete="Fecha"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant="h4">Lista de Productos</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                <AddIcon /> Agregar Producto
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre del Producto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </FormGrid>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Agregar Producto</DialogTitle>
                    <DialogContent>
                        <Autocomplete
                            freeSolo={true}
                            options={productsList}
                            getOptionLabel={(option) => option.label}
                            value={selectedProduct}
                            onChange={(event, newValue) => setSelectedProduct(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Buscar Producto"
                                    margin="dense"
                                    fullWidth
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleAddProduct} color="primary">
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}