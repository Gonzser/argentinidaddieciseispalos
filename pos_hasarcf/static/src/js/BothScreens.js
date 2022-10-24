odoo.define('pos_hasarcf.BothScreen', function(require) {
    "use strict";

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');


    const { Component } = owl;
    const { Context } = owl;

    const TicketScreen = require('point_of_sale.TicketScreen');

    const { useState } = owl.hooks;
    const models = require('point_of_sale.models');



    const { useListener, useAutofocus } = require('web.custom_hooks');
    const { posbus } = require('point_of_sale.utils');
    const { parse } = require('web.field_utils');

    var core = require('web.core');
    var _t = core._t;

    var order_2rf = {};
    var tiquet_2rf='';


    const PosHasarCFPaymentScreen = PaymentScreen =>
        class extends PaymentScreen {

        //@Override
        async _finalizeValidation() {

            var self = this;

//          Funcion sobre el Boton HasarCF otramas? "getUsers1"
            var fetchURLhasarcf = this.env.pos.config.hasarcf_ip;
//            console.log(fetchURLhasarcf);
            // dato del setting por pos.config.hasarcf_ip: 'http://192.168.1.129/fiscal.json'
//            console.log(typeof fetchURLhasarcf);
            async function getUsers1(reqBo1) {
                    let response1 = await fetch(
                      fetchURLhasarcf, {
                        method: 'POST',
                        body: JSON.stringify(reqBo1),
                        mode: 'cors', // no-cors, *cors, same-origin
                        headers: {
                          'Content-Type': 'application/json',
//                          'Access-Control-Allow-Origin': '*',
                        },
                      });
                    let data1 = await response1.json();
                    return data1;
            }
//            fin funcion

            let reqBody1 = {'ConsultarDatosInicializacion':{}};
            let bodydata1 = await getUsers1(reqBody1);
//            console.log(bodydata1);
//            var versionCF = bodydata1.ConsultarVersion.Version;
            var estadoCF = bodydata1.ConsultarDatosInicializacion.Estado.Fiscal[0];
            var numero_pos_cf = bodydata1.ConsultarDatosInicializacion.NumeroPos;
            var order    = this.env.pos.get_order();
            var lines    = order.get_orderlines();
            console.log("apenas entras al boton de validacion");
            console.log(order);

//           INICIO CON REFUND NOTAS DE CREDITO
             if (lines[0].quantity<0){
                var isRefund=true;
                console.log('Es un REFUND');
                console.log('//this is the obj orderline to refund');
                console.log(lines[0]);
                console.log('//this is ID of the redunfer_orderline to');
                console.log(lines[0].refunded_orderline_id);
                console.log('//ID put in a var orderline_id_2rf to find afip_docID');
                var orderline_id_2rf = lines[0].refunded_orderline_id;
                console.log('//looks like the pos made an array with all orderlines 2rf?');
                console.log(this.env.pos.toRefundLines);
                console.log('//array from 2rfLines all, then ID 2rf');
                console.log(this.env.pos.toRefundLines[lines[0].refunded_orderline_id]);
                console.log(this.env.pos.toRefundLines[orderline_id_2rf]);
                var orderline_2rf = this.env.pos.toRefundLines[lines[0].refunded_orderline_id];
                console.log('// put ol_2rf obj in a var ol_2rf');
                console.log(orderline_2rf);
                console.log('// get Order Uid from refund : orderUid NOT-> orderBackendId');
                var orderUid = orderline_2rf['orderline']['orderUid'];
                console.log(orderUid);
                console.log(orderline_2rf['orderline']['orderUid']);
                console.log('//NOW trying to bring orderUid intact and get tiquet_cf value');
//                console.log(self.db.get_order(orderUid));
                console.log(typeof orderUid);
                console.log(this.env.pos.get_order(orderUid));
                console.log('// vamos con orden manual string NOT -> integer');
                console.log(this.env.pos.get_order("00185-001-0001"));
                var order_2rfon = await this.env.pos.get_order(orderUid);
                console.log(order_2rfon['tiquet_cf']);

//              BRINGING ORDER_2RF from _onDoRefund method
                console.log('//NADA sigue trayendo lo que se le da la gana, la ultima orden o la orden actual');
//                console.log(PosHasarCFTicketScreen.get_order_2rf);
//                console.log(order_2rf);
                console.log(tiquet_2rf);
                //PARSING TIQUET to REFUND
                var comprobante_2rf=tiquet_2rf.substring(0,13);
                var auxguion=tiquet_2rf.indexOf('-');
                var posnro_2rf = parseInt(tiquet_2rf.slice(auxguion-5,auxguion));
                var tiquetnro_2rf = parseInt(tiquet_2rf.slice(auxguion+1));

                console.log(comprobante_2rf);
                console.log( auxguion);
                console.log( posnro_2rf );
                console.log( tiquet_2rf.slice(auxguion-5,auxguion));
                console.log( tiquetnro_2rf);
                console.log(tiquet_2rf.slice(auxguion));

//                console.log('//vamos con load primero await');
//                var tiquet_2rf = await this.load('orders', []);
//                console.log(data);
//                console.log(tiquet_2rf);

             };

//            console.log("Adentro y cargando info a la Linea de Pago");
            var paylinecf = this.currentOrder.get_paymentlines();
//            console.log(paylinecf[0].cardholder_name );
//            console.log(paylinecf[0].ticket );
//
//            paylinecf[0].ticket ='0023-000020725';
//            paylinecf[0].cardholder_name = 'El Card Holdero del Mercado';
//
//            console.log(paylinecf[0].cardholder_name );
//            console.log(paylinecf[0].ticket );

// aqui va el popup
/*

            const { confirmed, payload } = await this.showPopup('TextAreaPopup', {
                title: this.env._t('Ready to send to Hasar CF'),
                startingValue  : this.env._t("The CF Point of Sale'.\n"
//                 + JSON.stringify(bodydata1) + "\n" + JSON.stringify(order) + "\n" + JSON.stringify(lines)
                 + estadoCF
//                 + order.changed.client.name + order.uid + lines[0].product.display_name
                 ),


            });

//            console.log(this.env.pos.config.hasarcf_ip);

            if (confirmed||!confirmed) {
                const val = payload;
//                console.log(val);
*/


//              // OTRA funcion que hablo al Hasar CF? "getUsers"
                async function getUsers(reqBo) {
                    let response = await fetch(
                      fetchURLhasarcf, {
                        method: 'POST',
                        body: JSON.stringify(reqBo),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    let data = await response.json();

                    return data;
                }
//                    Fuera de la Funcion

                    let con0 = {'ComandoAbs':{}};
                    let con1 = {'ConsultarDatosInicializacion':{}};
                    let con2 = {'ConsultarVersion':{}};
                    let con3 = {'ConsultarEstado':{'CodigoComprobante': 'NoDocumento'}};
                    let con4 = {'Cancelar':{}};
                    let cardocas = { "CargarDocumentoAsociado": {
                                    "NumeroLinea" : "2",
                                    "CodigoComprobante" : "TiqueFacturaB",
                                    "NumeroPos" : "1",
                                    "NumeroComprobante" : "00000146"
                                  }};
                    let cardacli = {"CargarDatosCliente": {
                                    "RazonSocial": "ELSIS SRL - Electrosistemas a medida",
                                    "NumeroDocumento": "30714078832",
                                    "ResponsabilidadIVA": "ResponsableInscripto",
                                    "TipoDocumento": "TipoCUIT",
                                    "Domicilio": "Avenida Julio Argentino Roca 852 - CABA"
                                    }};
                    let cerrarjo = {  "CerrarJornadaFiscal": {    "Reporte": "ReporteZ"  }};
                    let abrirdoc = {  "AbrirDocumento": {    "CodigoComprobante": "TiqueFacturaA"  }};
                    let con77 = {  "AbrirDocumento": {    "CodigoComprobante": "TiqueFacturaB"  }};
//                    VALORES POR DEFECTO
                    let impritem = {  "ImprimirItem": {
                                    "Descripcion": "Cable miniplug 1.5",
                                    "Cantidad": "1.0",
                                    "PrecioUnitario": "0.20",
                                    "CondicionIVA": "Gravado",
                                    "AlicuotaIVA": "21.00",
                                    "OperacionMonto": "ModoSumaMonto",
                                    "TipoImpuestoInterno": "IIVariableKIVA",
                                    "MagnitudImpuestoInterno": "0.00",
                                    "ModoDisplay": "DisplayNo",
                                    "ModoBaseTotal": "ModoPrecioTotal",
                                    "UnidadReferencia": "1",
                                    "CodigoProducto": "779123456789",
                                    "CodigoInterno": "C1130",
                                    "UnidadMedida": "Unidad"
                                    }};
                    let impritem8 = {  "ImprimirItem": {
                                    "Descripcion": "Super Coinplug S5",
                                    "Cantidad": "3.0",
                                    "PrecioUnitario": "0.12",
                                    "CondicionIVA": "Gravado",
                                    "AlicuotaIVA": "10.50",
                                    "OperacionMonto": "ModoSumaMonto",
                                    "TipoImpuestoInterno": "IIVariableKIVA",
                                    "MagnitudImpuestoInterno": "0.00",
                                    "ModoDisplay": "DisplayNo",
                                    "ModoBaseTotal": "ModoPrecioTotal",
                                    "UnidadReferencia": "1",
                                    "CodigoProducto": "779123456798",
                                    "CodigoInterno": "C1134",
                                    "UnidadMedida": "Kilo"
                                    }};
                    let imprdesc = {  "ImprimirDescuentoItem": {
                                    "Descripcion" : "Descuento Especial",
                                    "Monto" : "1.00", "ModoDisplay" : "DisplayNo",
                                    "ModoBaseTotal" : "ModoPrecioTotal"
                                    }};
                    let imprpago = {  "ImprimirPago": {
                                    "Descripcion": "Tarjeta de Crédito",
                                    "Monto": "0.56",    "Operacion": "Pagar",
                                    "ModoDisplay": "DisplayNo",
                                    "DescripcionAdicional": "Nro.: *******3245",
                                    "CodigoFormaPago": "TarjetaDeCredito",
                                    "Cuotas": "1",    "Cupones": "12345678",
                                    "Referencia": "ABC123"
                                    }};
                    let cerradoc = {  "CerrarDocumento": {    "Copias": "0",    "DireccionEMail": "cliente@suempresa.com.ar"  }};
                    let cerradoc1 = {  "CerrarDocumento": {    "Copias": "1",    "DireccionEMail": "cliente@suempresa.com.ar"  }};
                    let con11 = {  "ConsultarAcumuladosComprobante": {    "CodigoComprobante": "TiqueFacturaA",    "NumeroComprobante": "3"  }};
                    let con12 = {  "ConfigurarImpresoraFiscal": {    "Variable": "ImpresionCodigoQR",    "Valor": "9"  }};
                    let con13 = {  "ConsultarConfiguracionImpresoraFiscal": {    "Variable": "ImpresionCodigoQR"  }};
                    let copicomp = {  "CopiarComprobante": {    "CodigoComprobante": "TiqueFacturaA",    "NumeroComprobante": "3", "Imprimir" : "No"  }};

                    let targetcommand = 'Cancelar';
                    con0[targetcommand] = con0['ComandoAbs'];
                    delete con0['ComandoAbs'];
//                    console.log(con0);


                var ordercf    = this.env.pos.get_order();
//                var ordercf    = this.currentOrder;
//                console.log("this current Order");
//                console.log(ordercf);
////                TRy to set a client when dont.
////                ordercf.set_hasarcf_ok(true);
////                ordercf.set_tiquet_cf("tiquet_cf que 1er cosa");
////                ordercf.hasarcf_ok=true;
////                ordercf.tiquet_cf="tiquet_cf cualquier 2da cosa";
//                console.log("AFTER this current Order");
//                console.log(ordercf);
                if (isRefund){

//                var comprobante_2rf=tiquet_2rf.substring(0,13);
//                var auxguion=tiquet_2rf.indexOf('-');
//                var posnro_2rf = parseInt(tiquet_2rf.slice(auxguion-5,auxguion));
//                var tiquetnro_2rf = parseInt(tiquet_2rf.slice(auxguion+1));

                   cardocas["CargarDocumentoAsociado"]["CodigoComprobante"]=comprobante_2rf;
                   cardocas["CargarDocumentoAsociado"]["NumeroPos"]=posnro_2rf;
                   cardocas["CargarDocumentoAsociado"]["NumeroComprobante"]=tiquetnro_2rf;

                }

//              Chequeo de cliente asignado - Copiar VAT a BARCODE
                if (!ordercf.get_client()) {
//                  IMPORTANTE DEFINIR BARCODE DE USUARIO COMO CONSUMIDOR FINAL POR DEFECTO
                    const partner = this.env.pos.db.get_partner_by_barcode('0123456');
                    ordercf.set_client(partner);
                }
                var clientcf   = ordercf.get_client();
                console.log("get the client name");
                console.log(clientcf.name);
                console.log(clientcf.l10n_ar_afip_responsibility_type_id[1]);
                console.log(clientcf.l10n_latam_identification_type_id[1]);
                console.log(clientcf.address);
                console.log(clientcf);

//                ordercf.tiquet_cf = '0000-00000000';
//                ordercf.hasarcf_ok = true;

//              Cargar Cliente: CargarDatosCliente
                let nombre = ""; //valor por defecto
                let resp_iva = "ConsumidorFinal";
                let valtype = clientcf.l10n_ar_afip_responsibility_type_id[0];
                let cod_comprobante = "TiqueFacturaB";
                let tipo_doc = "TipoNinguno";//valor correcto en caso de no especificar
                let documento = ""; //valor por defecto
                let domicilio = ""; //valor por defecto
                switch(valtype){
                    case 1:
                        resp_iva = "ResponsableInscripto";
                        cod_comprobante = "TiqueFacturaA";
                        nombre = clientcf.name;
                        tipo_doc = "TipoCUIT";
                        documento = clientcf.vat;
                        domicilio = domicilio=="" ? "Salta" : clientcf.address;
                        break;
                    case 4:
                        resp_iva = "ResponsableExento";
                        cod_comprobante = "TiqueFacturaB";
                        nombre = clientcf.name;
                        tipo_doc = "TipoCUIT";
                        documento = clientcf.vat;
                        domicilio = domicilio=="" ? "Salta" : clientcf.address;
                        break;
                    case 5:
                        resp_iva = "ConsumidorFinal";
                        cod_comprobante = "TiqueFacturaB";
//                        tipo_doc = "TipoDNI";
                        break;
                    case 7:
                        resp_iva = "NoCategorizado";
                        break;
                    case 6:
                        resp_iva = "Monotributo";
                        cod_comprobante = "TiqueFacturaB";
                        nombre = clientcf.name;
                        tipo_doc = "TipoCUIT";
                        documento = clientcf.vat;
                        domicilio = domicilio=="" ? "Salta" : clientcf.address;
                        break;
                    default:
                        resp_iva = "ConsumidorFinal";
                        cod_comprobante = "TiqueFacturaB";
//                        tipo_doc = "TipoNinguno";
                        break;
                }

                cardacli["CargarDatosCliente"]["RazonSocial"] = nombre;
                cardacli["CargarDatosCliente"]["NumeroDocumento"] = documento;
                cardacli["CargarDatosCliente"]["ResponsabilidadIVA"] = resp_iva;
                cardacli["CargarDatosCliente"]["TipoDocumento"] = tipo_doc;
//                cardacli["CargarDatosCliente"]["Domicilio"] = clientcf.address;
                cardacli["CargarDatosCliente"]["Domicilio"] = domicilio;


//                console.log(cardacli);
//                console.log(cardacli["RazonSocial"]);
//                console.log(cardacli["CargarDatosCliente"]["RazonSocial"]);

//              ABRIR Documento
                if(isRefund){
                    if(cod_comprobante.indexOf('A')!==-1){
                        cod_comprobante="TiqueNotaCreditoA";
                    }else{
                        cod_comprobante="TiqueNotaCreditoB";
                    }
                }
                abrirdoc ["AbrirDocumento"]["CodigoComprobante"] = cod_comprobante;

//                let con77 = {  "AbrirDocumento": {    "CodigoComprobante": "TiqueFacturaB"  }};

//              *** REWARDS_CONTAINERS ***
                var HASDISCOUNT;
                var rewards = ordercf.rewardsContainer? true : false;
                console.log("chequing REWARDs_CONTAINERS");
                console.log(rewards);
                if(rewards && ordercf.rewardsContainer.getAwarded().length>0){
                    console.log("This other way to get rewards");
                    var rewardlist = ordercf.rewardsContainer.getAwarded();
                    console.log(rewardlist);
                    var disc_apply=rewardlist[0].program.discount_apply_on;
                    console.log(disc_apply);
                    var disc_name = rewardlist[0].program.name;
                    console.log(disc_name);
                    var disc_perc = rewardlist[0].program.discount_percentage;
                    console.log(disc_perc);
                    HASDISCOUNT = true;
//                    console.log(ordercf.rewardsContainer.getAwarded()
//                    .map(({ product, unit_price, quantity, program, tax_ids, coupon_id }) => {
//                        const options = {
//                            quantity: quantity,
//                            price: unit_price,
//                            lst_price: unit_price,
//                            is_program_reward: true,
//                            program_id: program.id,
//                            tax_ids: tax_ids,
//                            coupon_id: coupon_id,
//                        };
//                    }));
                }


//              Iteration Order.Lines
//              var lines    = order.get_orderlines();//Definido al inicio
                var items = [];
                var impritemc = JSON.parse(JSON.stringify(impritem));
                var line_iva ="Gravado";
                var line_tax ="21.00";
                var itqty = 1;
                var itprice = 1;

                for (let i = 0; i < lines.length; i++) {
//                    console.log(lines[i].get_product());
                    console.log("This is the orderline(i) element")
                    console.log(lines[i]);

//                  Chequeo para evitar descuentos como items de Odoo
                    if(lines[i].price<0){console.log("price is negative!? is Odoo discount");continue;}

                    impritemc = JSON.parse(JSON.stringify(impritem));
//                  /***
                    impritemc["ImprimirItem"]["Descripcion"] = lines[i].product.display_name;
//                    impritemc["ImprimirItem"]["Cantidad"] = lines[i].quantityStr.replace(/-/,"");
//                    console.log(lines[i].quantityStr.replace(/-/,""));
                    console.log("as quantity number")
//                    console.log(typeof lines[i].quantity);
//                    console.log(lines[i].quantity);
//                    var itqty= parseFloat(lines[i].quantityStr.replace(/-/,"."));
                    itqty = Math.abs(lines[i].quantity).toFixed(3);
                    console.log("itQty");
                    console.log(itqty);
                    console.log(typeof itqty);
                    itprice = Math.abs(lines[i].price).toFixed(2);
                    console.log("itPrice");
                    console.log(itprice);
                    console.log(typeof itprice);
                    console.log(itprice*itqty);

//                    impritemc["ImprimirItem"]["Cantidad"] = lines[i].quantityStr.replace(/-/,"");
//                    impritemc["ImprimirItem"]["Cantidad"] = Math.abs(lines[i].quantity);
                    impritemc["ImprimirItem"]["Cantidad"] = itqty;
//                    impritemc["ImprimirItem"]["PrecioUnitario"] = Math.abs(lines[i].price);
                    impritemc["ImprimirItem"]["PrecioUnitario"] = itprice;
                    if(lines[i].get_taxes().length>0){line_iva ="Gravado";}
                    else{line_iva ="No Gravado";}
                    impritemc["ImprimirItem"]["CondicionIVA"] = line_iva;
                    line_tax = lines[i].get_taxes()[0].amount.toString();
                    impritemc["ImprimirItem"]["AlicuotaIVA"] = line_tax;
                    impritemc["ImprimirItem"]["OperacionMonto"] = "ModoSumaMonto";
                    impritemc["ImprimirItem"]["TipoImpuestoInterno"] = "IIVariableKIVA";
                    impritemc["ImprimirItem"]["MagnitudImpuestoInterno"] = "0.00";
                    impritemc["ImprimirItem"]["ModoDisplay"] = "DisplayNo";
                    impritemc["ImprimirItem"]["ModoBaseTotal"] = "ModoPrecioTotal";
//                    impritemc["ImprimirItem"]["UnidadReferencia"] = ?? codigo AFIP 1 lines[line].price;
                    impritemc["ImprimirItem"]["CodigoProducto"] = lines[i].product.barcode;
                    impritemc["ImprimirItem"]["CodigoInterno"] = lines[i].product.default_code;

                    var uom_id = 'Unidad';
                    switch(lines[i].product.uom_id[1]){
                        case 'm':
                            uom_id = 'Metro';
                            break;
                        case 'L':
                            uom_id = 'Litro';
                            break;
                        case 'kg':
                            uom_id = 'Kilo';
                            break;
                        case 'km':
                            uom_id = 'Kilometro';
                            break;
                        default:
                            uom_id = 'Unidad';
                            break;
                    }

//                    lines[i].note = cod_comprobante + " Nro: " + numero_pos_cf;
//                    console.log('Ma ver la linea');

//                    console.log(lines[i]);

//                    console.log(lines[i].product.uom_id[1]);
//                    console.log(typeof lines[i].product.uom_id[1]);
                    impritemc["ImprimirItem"]["UnidadMedida"] = uom_id;
//                  End*/

                    items.push(impritemc);


//                  ***  Check if descuento item

                    if (HASDISCOUNT){
                        impritemc = JSON.parse(JSON.stringify(imprdesc));
                        impritemc["ImprimirDescuentoItem"]["Descripcion"] = disc_name;
                        impritemc["ImprimirDescuentoItem"]["Monto"] = Math.abs((disc_perc*lines[i].price)/100*itqty);
                        impritemc["ImprimirDescuentoItem"]["ModoDisplay"] = "DisplayNo";
                        impritemc["ImprimirDescuentoItem"]["ModoBaseTotal"] = "ModoPrecioTotal";
                        items.push(impritemc);
                    }
                }

//              PAYMENT LINES
                var imprpagos = [];
                var imprpagoc = JSON.parse(JSON.stringify(imprpago));
//                var paylinecf = this.currentOrder.get_paymentlines();
//                console.log('payment what!')
//                console.log(ordercf.get_paymentlines());
                var paylinecf = ordercf.get_paymentlines();

                var codpago = "Efectivo";
                var descpago = "Pago en Efectivo";

                for (let i = 0; i < paylinecf.length; i++) {
                    console.log(paylinecf[i]);
                    imprpagoc = JSON.parse(JSON.stringify(imprpago));

                    switch(paylinecf[i].name){
                        case 'Cash'||'EFECTIVO':
                            codpago = 'Efectivo';
                            descpago = "Pago en Efectivo";
                            break;
                        case 'Bank'||'QR CVU/CBU':
                            codpago = 'TransferenciaBancaria';
                            descpago = "Pago por QR CVU/CBU";
                            break;
                        case 'Customer Account'||'CTA CTE':
                            codpago = 'CuentaCorriente';
                            descpago = "Cuenta Corriente";
                            break;
                        case 'Credit/Debit Card' || 'VISA CREDITO' || 'MASTERCARD'||'NARANJA':
                            codpago = 'TarjetaDeCredito';
                            descpago = paylinecf[i].name;
                            break;
                        case 'VISA DEBITO' || 'MAESTRO'||'NATIVA':
                            codpago = 'TarjetaDeDebito';
                            descpago = paylinecf[i].name;
                            break;
                        default:
                            codpago = 'Efectivo';
                            descpago = paylinecf[i].name;
                            break;
                    }

                    imprpagoc["ImprimirPago"]["Descripcion"] = descpago;
                    imprpagoc["ImprimirPago"]["Monto"] = paylinecf[i].amount;
                    imprpagoc["ImprimirPago"]["Operacion"] = "Pagar";
                    imprpagoc["ImprimirPago"]["DescripcionAdicional"] = paylinecf[i].cardholder_name;
                    imprpagoc["ImprimirPago"]["CodigoFormaPago"] = codpago;
                    imprpagoc["ImprimirPago"]["Cuotas"] = "0";
                    imprpagoc["ImprimirPago"]["Cupones"] = "";
                    imprpagoc["ImprimirPago"]["Referencia"] = paylinecf[i].tiquet;

                    imprpagos.push(imprpagoc);

                }

//                console.log(paylinecf[0].cardholder_name );
//                console.log(paylinecf[0].ticket );
//
//                paylinecf[0].ticket ='0023-000020725';
//                paylinecf[0].cardholder_name = 'El Card Holdero del Mercado';
//
//                console.log(paylinecf[0].cardholder_name );
//                console.log(paylinecf[0].ticket );



//                    let items=[impritem,impritemc,impritem8c,impritem8];
//                    let items=[impritem,impritem8];
                    let reqBody = [];
//                          let reqBody = [cerradoc, con2,con0];
//                          let reqBody = [con2,con13,con1,con3,con4,con3,cerrarjo];
//                          let reqBody = [cardacli,abrirdoc,impritem,impritem8,imprpago,cerradoc];
//                          let reqBody = [con2,con77,impritem8,impritem,imprpago,cerradoc];

                    let reqBodyc = isRefund?[cardocas,cardacli,abrirdoc]:[cardacli,abrirdoc];
                    let pieDoc = [imprpagos,cerradoc,con3];


                    reqBody = reqBodyc.concat(...items, ...pieDoc);

//                          reqBody.push(...items);
//                          reqBody.push(...pieDoc);

//                          console.log(reqBody);
//                          console.log(items);
//                          console.log(pieDoc);


                    // MAKE a mess because forEach can not run in async loop
                    //reqBody.forEach(reqBo => {
                    //getUsers(reqBo).then(data => console.log(data));
                    //});

//                  IMPRESION DEL COMPROBANTE
//                  Inicializacion de variables
                    var errcf=0;
                    var response_data ="";
                    var comando_cf=[];
                    var elcomando = "";
                    var tiquet_cf2=" Nro: "+ "-0";
                    var tiquet_cf=" Nro: ";
                    var jornadafiscal = 0;
                    var cf_docID = 0;
                    var descripcion = "";
//                  IMPRESION DEL COMPROBANTE
                    for(let i= 0; i<reqBody.length;i++) {

                        console.log("Indice del for: " + i);
                        console.log("Errores CF: " + errcf);
                        comando_cf = Object.keys(reqBody[i]);
//                        console.log("comando_cf cual?[0]");
//                        console.log(comando_cf[0]);
//                        console.log(typeof comando_cf[0]);
                        elcomando = comando_cf[0];
                        console.log("Este es el Comando de turno_" + i);
                        console.log(elcomando);
//                        console.log(typeof elcomando);

                        console.log("Elemento item a enviar al CF");
                        console.log(reqBody[i]);

                        await getUsers(reqBody[i])
                            .then(data => {
                                console.log("respuesta del CF");
                                console.log(data);
                                response_data = data;
                                let numerocomprobante_cf ="";

                                console.log(response_data[elcomando]["Estado"]["Fiscal"][0]);
                                console.log(typeof response_data[elcomando]["Estado"]["Fiscal"][0]);
                                if(response_data[elcomando]["Estado"]["Fiscal"][0]=="MemoriaFiscalInicializada"){
                                    console.log("rTodo Bien Fiscalmente hablando");
                                    // Respuesta 0 para correcto estado de la Impresora
//                                    console.log(response_data[elcomando]["Estado"]["Impresora"].length);
//                                    console.log(response_data[comando_cf[0]]["Estado"]["Fiscal"][0]);
                                }else{console.log("nLa cago@n");errcf=errcf+1;}

                                if(response_data.AbrirDocumento) {
                                    console.log(response_data.AbrirDocumento.NumeroComprobante);
                                    numerocomprobante_cf = response_data.AbrirDocumento.NumeroComprobante;
                                    tiquet_cf2 = cod_comprobante + " Nro: " + numero_pos_cf + "-0" + numerocomprobante_cf;
                                    console.log(tiquet_cf2);
                                };
                                if(response_data.ConsultarEstado) {
                                    console.log(response_data.ConsultarEstado.NumeroUltimoComprobante);
                                    const auxnro_cf = "0000000" + response_data.ConsultarEstado.NumeroUltimoComprobante
                                    numerocomprobante_cf = auxnro_cf.substring((auxnro_cf.length-8), auxnro_cf.length);
                                    tiquet_cf =  response_data.ConsultarEstado.CodigoComprobante
                                    + " Nro: " + numero_pos_cf + "-" + numerocomprobante_cf;
                                    console.log(tiquet_cf);
                                }else{console.log('AGUA');console.log(typeof response_data);};


                                // ESTAMOS en el Ultimo item del array reqBody
                                if((i+1)===reqBody.length){
                                        console.log('Intentando cargar el tiquetCF en las lineas de la bdodoo');
                                        console.log(tiquet_cf2 + "  y   "+ tiquet_cf);
//                    //                  CARGA DE TIQUET EN LINEA DE COMPRA Y LINEA DE PAGO
//                                        for (let j = 0; j < lines.length; j++) {
//                                        lines[j].down_payment_details = tiquet_cf;
//                                        lines[j].customerNote = tiquet_cf;
//                                        };

//                                      CARGA DE TIQUET EN LINEA DE  LINEA DE PAGO
                                        for (let j = 0; j < paylinecf.length; j++) {
                                        paylinecf[j].ticket = tiquet_cf;
                                        paylinecf[j].transaction_id = "Puede ir ref desde payload val";
                                        };
//                                        ordercf.set_hasarcf_ok(true);
//                                        ordercf.set_tiquet_cf(tiquet_cf);
                                        ordercf.hasarcf_ok=true;
                                        ordercf.tiquet_cf=tiquet_cf;
//                                        ordercf.note = tiquet_cf;

                                };
                                return elcomando;




                            })
                            .then( elcomando => {

//                              Chequeo de la correcta respuesta del controlador CF
                                console.log("paso al segundo then");
                                console.log(elcomando);
                                if (response_data[elcomando]){
                                    if (response_data[elcomando]["Estado"]["Fiscal"][0]!="MemoriaFiscalInicializada"&&errcf%7!=0){

//                                  MARCA EN DESCRIPCION - PERO EVITAS SI EL COMANDO NO TIENE DESC.
                                    if(elcomando=='ImprimirPago'||elcomando=='ImprimirItem'||elcomando=='ImprimirDescuentoItem'){

//                                      console.log("Descripcion");
//                                      console.log(reqBody[i][elcomando]["Descripcion"]);
                                        descripcion = reqBody[i][elcomando]["Descripcion"];

//                                      console.log(typeof descripcion.indexOf('(er'));
                                        if(descripcion.indexOf('(er')!=-1){
                                            reqBody[i][elcomando]["Descripcion"] = descripcion.slice(0,(descripcion.indexOf('(er'))) + "(er" + errcf + ")";
                                        }else{
                                            reqBody[i][elcomando]["Descripcion"]= descripcion + " (er" + errcf + ")";
                                        }

                                        console.log("Descripcion con su agregado");
                                        console.log(reqBody[i][elcomando]["Descripcion"]);

                                    }


                                    i=i-1;
                                    console.log("Entro al error: #"+ errcf + ", indice vuelta atras: " + i);


                                    }
//                                    if(errcf==3)errcf=4;
//                                    console.log(response_data.ImprimirItem.Estado.Fiscal[0]);
//                                    console.log(response_data.ImprimirItem.Estado.Fiscal);
//                                    console.log(response_data.ImprimirItem.Estado);
//                                    console.log(response_data.ImprimirItem);
                                }
                            });

//                          After await data
                    };
//                  End of ForLoop


//            }
//            Cierre del Popup

            return super._finalizeValidation();

        }
    };

    Registries.Component.extend(PaymentScreen, PosHasarCFPaymentScreen);

//  Tuve que poner la extension de PaymentScreen y TicketScreen juntos
//  Porque me cague para pasar orfer_2rf y tiquet_2rf de Tick a Pay (tera)
    const PosHasarCFTicketScreen = TicketScreen =>
        class extends TicketScreen {

            //@Override
            async _onDoRefund() {
                var self = this;

                order_2rf = this.getSelectedSyncedOrder();
                if (!order_2rf) {
                    console.log('//No ORDER')
                }

//              const customer = order.get_client();
                console.log('//_onDoRefund');
                console.log(order_2rf);
                console.log(order_2rf.paymentlines.models[0].ticket);
                tiquet_2rf = order_2rf.paymentlines.models[0].ticket;

                return super._onDoRefund();
            }

        }

    Registries.Component.extend(TicketScreen, PosHasarCFTicketScreen);

    return {PosHasarCFPaymentScreen, PosHasarCFTicketScreen};
});