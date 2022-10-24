odoo.define('pos_hasarcf.HasarCFButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');

    class HasarCFButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }

        async onClick() {
            var self = this;
//            console.log(this.env.pos.config.hasarcf_ip);
//            console.log(typeof this.env.pos.config.hasarcf_ip);
//            console.log("Que es esto?");
//            console.log(this.env.pos.db.order);
            let targetcommand = 'ConsultarVersion';
            var fetchURLhasarcf = this.env.pos.config.hasarcf_ip;
//            console.log(fetchURLhasarcf);
            // dato del setting por pos.config.hasarcf_ip: 'http://192.168.1.129/fiscal.json'
//            console.log(typeof fetchURLhasarcf);
            async function getUsers1(reqBo1) {
                    let response1 = await fetch(
                      fetchURLhasarcf, {
                        method: 'POST',
                        body: JSON.stringify(reqBo1),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    let data1 = await response1.json();
                    return data1;
            }
//            fin funcion

            let reqBody1 = {'ConsultarVersion':{}};
            let bodydata1 = await getUsers1(reqBody1);
            console.log(bodydata1);
            var versionCF = bodydata1.ConsultarVersion.Version;
            var estadoCF = bodydata1.ConsultarVersion.Estado.Fiscal[0];
            var order    = this.env.pos.get_order();
            var lines    = order.get_orderlines();
//            console.log(order.finalized);



//            console.log(typeof versionCF);
//            console.log(typeof order);
//            console.log(order);
//            console.log(order.changed.client.name);
//            console.log(typeof lines);
////            console.log(lines);

//            for (const line of lines) {
//                console.log(line.get_product());
////                    order.remove_orderline(line);
//            }


            // aqui va el popup con info de estado y posibilidad de acciones
            // comandos de cierre de cajero X y cierre de jornada fiscal Z
            const { confirmed, payload } = await this.showPopup('TextAreaPopup', {
                title: this.env._t('Hasar CF State and Version'),
                startingValue  : this.env._t("Indique que operacion desea realizar.\nEst: "
//                      + JSON.stringify(bodydata) + "\n" + JSON.stringify(order) + "\n" + JSON.stringify(lines)
//                      + versionCF + order.changed.client.name + order.uid + lines[0].product.display_name
                    + targetcommand
                ),

//                startingValue: (JSON.stringify(bodydata) + "\n" + JSON.stringify(order) + "\n" + JSON.stringify(lines)),
//                array: packLotLinesToEdit,

            });

            if (confirmed){

                const val = payload;
//                console.log(val);

//                this.currentOrder.tiquet_cf = '0022-000220724';
//                this.currentOrder.hasarcf_ok = true;
//                console.log('check comp to write CF data aux')
//                console.log(this.currentOrder.note);
//                console.log(this.currentOrder.nb_print);
//                console.log(this.currentOrder);

//                var self = this;

//                console.log(this.env.pos.config.hasarcf_ip);
//                  console.log(typeof this.env.pos.config.hasarcf_ip);
//                var fetchURLhasarcf = this.env.pos.config.hasarcf_ip;
//                  console.log(fetchURLhasarcf);
            //      dato del setting por pos.config.hasarcf_ip: 'http://192.168.1.129/fiscal.json'
//                  console.log(typeof fetchURLhasarcf);

                async function getUsers1(reqBo1) {
                    let response1 = await fetch(
                      fetchURLhasarcf, {
                        method: 'POST',
                        body: JSON.stringify(reqBo1),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    let data1 = await response1.json();
                    return data1;
                }
//                  fin funcion

                let con0 = {'ComandoAbs':{}};
                let con1 = {'ConsultarDatosInicializacion':{}};
                let con2 = {'ConsultarVersion':{}};
                let con3 = {'ConsultarEstado':{'CodigoComprobante': 0}};
                let con4 = {'Cancelar':{}};
                let con5 = {"CerrarJornadaFiscal": {"Reporte": "ReporteX"}};
                let cerrarjo = {"CerrarJornadaFiscal": {"Reporte": "ReporteZ"}};
                let cerradoc = {  "CerrarDocumento": {    "Copias": "0",    "DireccionEMail": ""  }};
                let reimpres = { "PedirReimpresion" : { } };
                let copiacom = { "CopiarComprobante": {
                                    "CodigoComprobante" : "TiqueFacturaB",
                                    "NumeroComprobante" : "1562",
                                    "Imprimir" : "No"
                                }};


                let reqB = {};
                let option="";

                console.log(val);
                console.log(typeof val);

                switch(val){
                    case "1":
                        reqB = con1;
                        break;
                    case "2":
                        reqB = con2;
                        break;
                    case "3":
                        reqB = con3;
                        break;
                    case "4":
                        reqB = con4;
                        break;
                    case "5":
                    case "cierre x":
                        reqB = con5;
                        break;
                    case "6":
                    case "cierre z":
                        reqB = cerrarjo;
                        break;
                    case "7":
                        reqB = cerradoc;
                        break;
                    case "8":
                        reqB = reimpres;
                        break;
                    default:
                        reqB = con0;
                        option = 'ConsultarEstado';
                        break;
                }

//                console.log(reqB);
//                console.log(typeof reqB);

                let camb = option;
                con0[camb] = con0['ComandoAbs'];
                delete con0['ComandoAbs'];
//                console.log(con0);
//                console.log(typeof con0);




//                let reqBody1 = {'ConsultarVersion':{}};
//                console.log(reqBody1);


                let bodydata1 = await getUsers1(reqB);
                console.log(bodydata1);
            }


        }

    }
    HasarCFButton.template = 'HasarCFButton';

    ProductScreen.addControlButton({
        component: HasarCFButton,
        condition: () => true,
        position: ['before', 'ProductInfoButton'],

    });

    Registries.Component.add(HasarCFButton);

    return HasarCFButton;
});
