import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import useFetchCreatePurchase from "../../hooks/useFetchCreatePurchase";
import { createPurchaseService } from "../../services/supplychain";
import { CheckCircleOutline } from "@mui/icons-material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const filter = createFilterOptions();

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

export default function createPurchase() {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productInputValue, setProductInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const { createPurchase, loading, error } = useFetchCreatePurchase();
  const [paymentmethod, setPaymentMethod] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [units, setUnits] = useState([]);
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (createPurchase && createPurchase.body) {
      setPaymentMethod(createPurchase.body.paymentMethods);
      setSuppliers(createPurchase.body.suppliers);
      setDepartments(createPurchase.body.departments);
      setProductsList(createPurchase.body.products)
      setUnits(createPurchase.body.unitMeasures)
    }
  }, [createPurchase]);

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
      selectedProduct.quantity = 1;
      selectedProduct.subtotal = selectedProduct.quantity * selectedProduct.unitPrice;
      setProducts([...products, selectedProduct]);
    } else {
      const newProductItem = { id: "Nuevo", label: productInputValue };
      setProductsList([...productsList, newProductItem]);
      setProducts([...products, newProductItem]);
    }
    handleClose();
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index
        ? {
          ...product,
          [field]: value,
          subtotal:
            field === "unitPrice" || field === "quantity"
              ? field === "unitPrice"
                ? parseFloat(value) * product.quantity
                : product.unitPrice * parseInt(value, 10)
              : product.subtotal,
        }
        : product
    );
    setProducts(updatedProducts);
  };

  const calculateSubtotalExento = () => {
    return products.reduce((acc, product) => {
      return product.isv == 0 ? acc + product.unitPrice * product.quantity : acc;
    }, 0);
  };

  const calculateSubtotalGeneral = () => {
    return products.reduce(
      (acc, product) => acc + product.unitPrice * product.quantity,
      0
    );
  };

  const calculateSubtotalConImpuesto = () => {
    return products.reduce((acc, product) => {
      return product.isv > 0 ? acc + product.unitPrice * product.quantity : acc;
    }, 0);
  };

  const calculateImpuestoTotal = () => {
    return products.reduce((acc, product) => {
      return product.isv > 0
        ? acc + (product.unitPrice * product.quantity * product.isv) / 100
        : acc;
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestData = {
      header: {
        user: 'denis'
      },
      body: {
        supplierIdUUID: data.get("supplier"),
        purchaseDate: data.get("date"),
        parameterDepartmentIdUUID: data.get("dept-sol"),
        purchaseSubject: data.get("subject"),
        subtotal: data.get("subTotal"),
        exemptAmount: data.get("subTotalExent"),
        taxedAmount: data.get("subTotalIsv"),
        isvAmount: data.get("isvTotal"),
        total: data.get("total"),
        letterValue: 'DE',
        note: data.get("note"),
        parameterPaymentMethodIdUUID: data.get("paymentmethod"),
        detailPurchase: products.map(product => ({
          item: product.productCode,
          unitOM: product.unitOM,
          productIdUUID: product.id,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
          subTotal: product.subtotal,
          productName: product.productName,
          isv: product.isv
        }))
      }
    };

    try {
      const responseData = await createPurchaseService(requestData);
      setPurchaseNumber(responseData.body)
      setSuccessOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSucces = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setSuccessOpen(false);
    }
  };

  const handleNewPurchase = () => {
    setSuccessOpen(false);
  };

  const handleGenerateExcel = () => {
    // Lógica para generar Excel
    console.log('Generar Excel');
    setSuccessOpen(false);
  };

  const handleGeneratePDF = () => {
    // Lógica para generar PDF
    console.log('Generar PDF');
    setSuccessOpen(false);
  };

  return (
    <div>
      <Grid component="form" onSubmit={handleSubmit} container spacing={3} pb={5}>
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
                {supplier.supplierName}
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
                {department.description}
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
                {method.description}
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
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={product.unitOM}
                        onChange={(e) =>
                          handleProductChange(index, "unitOM", e.target.value)
                        }
                        fullWidth
                      >
                        {units.map((unit) => (
                          <MenuItem key={unit.id} value={unit.id}>
                            {unit.description}
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
                        value={parseFloat(product.unitPrice).toFixed(2)}
                        onChange={(e) =>
                          handleProductChange(index, "unitPrice", e.target.value)
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
                option.productName ? option.productName : option
              }
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    productName: `Agregar "${params.inputValue}"`,
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
                    productName: newValue,
                    isv: 0,
                    quantity: 0,
                    unitPrice: 0,
                    unitOM: "",
                    subtotal: 0,
                  });
                } else if (newValue && newValue.inputValue) {
                  setSelectedProduct({
                    id: "Nuevo",
                    productName: newValue.inputValue,
                    isv: 0,
                    quantity: 0,
                    unitPrice: 0,
                    unitOM: "",
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
          <FormGrid item xs={5}>
            <FormLabel htmlFor="note">
              Comentario
            </FormLabel>
            <TextField
              id="note"
              name="note"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
          </FormGrid>

          <Grid item xs={7}>
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
                  name="subTotal"
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
                <FormLabel htmlFor="subTotalExent">Importe Exento</FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="subTotalExent"
                  name="subTotalExent"
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
                <FormLabel htmlFor="subTotalIsv">
                  Importe Gravado
                </FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="subTotalIsv"
                  name="subTotalIsv"
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
                <FormLabel htmlFor="isvTotal">Importe ISV</FormLabel>
              </Grid>
              <Grid item>
                <OutlinedInput
                  id="isvTotal"
                  name="isvTotal"
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
                  name="total"
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
        <Dialog
          open={successOpen}
          onClose={handleCloseSucces}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Orden Creada Exitosamente"}</DialogTitle>
          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <CheckCircleOutline style={{ fontSize: '80px', color: 'green' }} />
            </div>
            <DialogContentText id="alert-dialog-description">
              Su orden es {<span style={{ fontWeight: "bold" }}>{purchaseNumber}</span>} ¿Qué te gustaría hacer a continuación?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewPurchase} color="primary">
              Crear nueva orden
            </Button>
            <Button onClick={handleGenerateExcel} color="primary">
              Generar Excel
            </Button>
            <Button onClick={handleGeneratePDF} color="primary" autoFocus>
              Generar PDF
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
