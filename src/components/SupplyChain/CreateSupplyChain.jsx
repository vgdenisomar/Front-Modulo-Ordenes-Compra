import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField, Typography,
  createFilterOptions
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const filter = createFilterOptions();

const initialProductsList = [
  {
    id: 1,
    label: "Producto 1",
    unit: "kg",
    price: 10,
    isv: 0,
    quantity: 0,
    subtotal: 0,
  },
  {
    id: 2,
    label: "Producto 2",
    unit: "kg",
    price: 10,
    isv: 0,
    quantity: 0,
    subtotal: 0,
  },
  {
    id: 3,
    label: "Producto 3",
    unit: "kg",
    price: 10,
    isv: 0,
    quantity: 0,
    subtotal: 0,
  },
  {
    id: 4,
    label: "Producto 4",
    unit: "kg",
    price: 10,
    isv: 0,
    quantity: 0,
    subtotal: 0,
  },
];

const departments = [
  {
    id: 1,
    label: "Compras",
  },
  {
    id: 2,
    label: "Tecnologia",
  },
];

const suppliers = [
  {
    id: 1,
    label: "Bananera",
  },
  {
    id: 2,
    label: "Larach",
  },
];

const paymentmethod = [
  {
    id: 1,
    label: "Efectivo",
  },
  {
    id: 2,
    label: "Mixto",
  },
];

const taxes = [
  {
    id: 0,
    label: "Exento",
  },
  {
    id: 15,
    label: "15 %",
  },
  {
    id: 18,
    label: "18 %",
  },
];

const units = ["kg", "litros", "unidad"];

export default function CreateSupplyChain() {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productInputValue, setProductInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList, setProductsList] = useState(initialProductsList);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setProductInputValue("");
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      setProducts([...products, selectedProduct]);
    } else {
      const newProductItem = { id: "Nuevo", label: productInputValue };
      setProductsList([...productsList, newProductItem]);
      setProducts([...products, newProductItem]);
    }
    handleClose();
  };

  const handleRemoveProduct = (index) => {
    console.log(index);
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index
        ? {
            ...product,
            [field]: value,
            subtotal:
              field === "price" || field === "quantity"
                ? field === "price"
                  ? parseFloat(value) * product.quantity
                  : product.price * parseInt(value, 10)
                : product.subtotal,
          }
        : product
    );
    setProducts(updatedProducts);
  };

  const calculateSubtotalExento = () => {
    return products.reduce((acc, product) => {
      return product.isv == 0 ? acc + product.price * product.quantity : acc;
    }, 0);
  };

  const calculateSubtotalGeneral = () => {
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  };

  const calculateSubtotalConImpuesto = () => {
    return products.reduce((acc, product) => {
      return product.isv > 0 ? acc + product.price * product.quantity : acc;
    }, 0);
  };

  const calculateImpuestoTotal = () => {
    return products.reduce((acc, product) => {
      return product.isv > 0
        ? acc + (product.price * product.quantity * product.isv) / 100
        : acc;
    }, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      supplier: data.get("supplier"),
      deptSol: data.get("dept-sol"),
    });
  };

  return (
    <div>
      <Grid component="form" onSubmit={handleSubmit} container spacing={3}>
        <FormGrid item xs={12} md={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} display="flex" alignItems="center">
              <AssignmentTurnedInOutlinedIcon sx={{ mr: "8px" }} />
              <Typography variant="h5">Orden de Compra</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<SaveIcon />}
              >
                Generar orden de compra
              </Button>
            </Grid>
          </Grid>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="supplier" required>
            Proveedor
          </FormLabel>
          <Select
            defaultValue=""
            size="small"
            id="supplier"
            name="supplier"
            type="supplier"
            placeholder="supplier"
            autoComplete="Proveedor"
            required
          >
            {suppliers.map((supplier, index) => (
              <MenuItem key={index} value={supplier.id}>
                {supplier.label}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="dept-sol" required>
            Departamento solicitante
          </FormLabel>
          <Select
            defaultValue=""
            size="small"
            id="dept-sol"
            name="dept-sol"
            type="dept-sol"
            placeholder="Departamento solicitante"
            autoComplete="Departamento solicitante"
          >
            {departments.map((department, index) => (
              <MenuItem key={index} value={department.id}>
                {department.label}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="subject" required>
            Asunto
          </FormLabel>
          <OutlinedInput
            size="small"
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
            defaultValue=""
            size="small"
            id="paymentmethod"
            name="paymentmethod"
            type="paymentmethod"
            placeholder="Forma de pago"
            autoComplete="Forma de pago"
            required
          >
            {paymentmethod.map((method, index) => (
              <MenuItem key={index} value={method.id}>
                {method.label}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid item xs={3}>
          <FormLabel htmlFor="date" required>
            Fecha
          </FormLabel>
          <OutlinedInput
            size="small"
            id="date"
            name="date"
            type="date"
            placeholder="Fecha"
            autoComplete="Fecha"
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Lista de Productos</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                startIcon={<AddIcon />}
              >
                Agregar Producto
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Nombre del Producto</TableCell>
                  <TableCell>UM</TableCell>
                  <TableCell>ISV</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div
                        onClick={() => handleRemoveProduct(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <DeleteOutlineIcon />
                      </div>
                    </TableCell>
                    <TableCell>{product.label}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={product.unit}
                        onChange={(e) =>
                          handleProductChange(index, "unit", e.target.value)
                        }
                        fullWidth
                      >
                        {units.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={product.isv}
                        onChange={(e) =>
                          handleProductChange(index, "isv", e.target.value)
                        }
                        fullWidth
                      >
                        {taxes.map((tax) => (
                          <MenuItem key={tax.id} value={tax.id}>
                            {tax.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={product.price}
                        onChange={(e) =>
                          handleProductChange(index, "price", e.target.value)
                        }
                        type="number"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">L.</InputAdornment>
                          ),
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                        type="number"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>{product.subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FormGrid>

        <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Producto</DialogTitle>
          <DialogContent>
            <Autocomplete
              freeSolo
              options={productsList}
              getOptionLabel={(option) =>
                option.label ? option.label : option
              }
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    label: `Agregar "${params.inputValue}"`,
                    inputValue: params.inputValue,
                  });
                }

                return filtered;
              }}
              onInputChange={(event, newInputValue) => {
                setProductInputValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setSelectedProduct({
                    id: "Nuevo",
                    label: newValue,
                    isv: 0,
                    quantity: 0,
                    price: 0,
                    unit: "",
                    subtotal: 0,
                  });
                } else if (newValue && newValue.inputValue) {
                  setSelectedProduct({
                    id: "Nuevo",
                    label: newValue.inputValue,
                    isv: 0,
                    quantity: 0,
                    price: 0,
                    unit: "",
                    subtotal: 0,
                  });
                } else {
                  setSelectedProduct(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar o agregar producto"
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
        <Grid item container spacing={2} pt="10px">
          <FormGrid item xs={6}>
            <FormLabel htmlFor="note">
              Comentario
            </FormLabel>
            <TextField
              id="note"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
          </FormGrid>

          <Grid xs={6}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              mt="0px"
            >
              <Grid item>
                <FormLabel htmlFor="subTotalExent">Subtotal Exento</FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="subTotalExent"
                  value={calculateSubtotalExento().toFixed(2)}
                  startAdornment={
                    <InputAdornment position="start">L.</InputAdornment>
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              mt="0px"
            >
              <Grid item>
                <FormLabel htmlFor="subTotal">Subtotal General</FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="subTotal"
                  value={calculateSubtotalGeneral().toFixed(2)}
                  startAdornment={
                    <InputAdornment position="start">L.</InputAdornment>
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              mt="0px"
            >
              <Grid item>
                <FormLabel htmlFor="subTotalIsv">
                  Subtotal Con Impuesto
                </FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="subTotalIsv"
                  value={calculateSubtotalConImpuesto().toFixed(2)}
                  startAdornment={
                    <InputAdornment position="start">L.</InputAdornment>
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              mt="0px"
            >
              <Grid item>
                <FormLabel htmlFor="isvTotal">Impuesto total</FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="isvTotal"
                  value={calculateImpuestoTotal().toFixed(2)}
                  startAdornment={
                    <InputAdornment position="start">L.</InputAdornment>
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              mt="0px"
            >
              <Grid item>
                <FormLabel htmlFor="total">Total</FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="total"
                  value={(
                    calculateSubtotalGeneral() + calculateImpuestoTotal()
                  ).toFixed(2)}
                  startAdornment={
                    <InputAdornment position="start">L.</InputAdornment>
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
