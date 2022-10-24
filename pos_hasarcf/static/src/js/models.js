odoo.define('pos_hasarcf.models', function (require) {
  "use strict";

  var models = require('point_of_sale.models');

//  var existing_models = models.PosModel.prototype.models;
//  var product_index = _.findIndex(existing_models, function (model) {
//      return model.model === "product.product";
//  });
//  var product_model = existing_models[product_index];
//
//  models.load_models([{
//    model:  product_model.model,
//    fields: product_model.fields,
//    order:  product_model.order,
////    domain: function(self) {return true;},
//    context: product_model.context,
//    loaded: product_model.loaded,
//  }]);

  models.load_fields('res.partner', ['email', 'is_company','company_name',
                 'l10n_ar_gross_income_number','l10n_ar_gross_income_type',
                 'l10n_ar_afip_responsibility_type_id','l10n_latam_identification_type_id']);

  models.load_fields('pos.order', ['hasarcf_ok', 'tiquet_cf']);


  var _order_super = models.Order.prototype;
  models.Order = models.Order.extend({

    initialize: function(attributes,options){
        _order_super.initialize.apply(this, arguments);
        var self = this;
        this.hasarcf_ok=null;
        this.tiquet_cf=null;
        this.save_to_db();
        return this;
    },
    export_as_JSON: function () {
      var json = _order_super.export_as_JSON.apply(
        this,
        arguments
      );
      json.tiquet_cf = this.tiquet_cf;
      json.hasarcf_ok = this.hasarcf_ok;
//      console.log(this.tiquet_cf + " -datosjson- " + this.hasarcf_ok );
//      console.log(this.finalized);
//      var json = {
//      tiquet_cf : this.tiquet_cf,
//      hasarcf_ok : this.hasarcf_ok,
//      };
      return json;
    },
    init_from_JSON: function (json) {
      _order_super.init_from_JSON.apply(this, arguments);
      this.tiquet_cf = json.tiquet_cf;
      this.hasarcf_ok = json.hasarcf_ok;
    },

    set_hasarcf_ok: function(how_hasarcf_ok) {
//        this.assert_editable();
        this.hasarcf_ok = how_hasarcf_ok;
//        this.trigger('change');
//        _order_super.initialize.apply(this, arguments);
//        var self = this;
//        this.hasarcf_ok   = how_hasarcf_ok;
////        this.tiquet_cf   = 'undefinique';
//        this.save_to_db();
//        return this;
    },

    set_tiquet_cf: function(the_tiquet_cf) {
//        this.assert_editable();
//        this.tiquet_cf = the_tiquet_cf;
//        this.trigger('change');
//        _order_super.initialize.apply(this, arguments);
//        var self = this;
//        this.hasarcf_ok   = false;
        this.tiquet_cf   = the_tiquet_cf;
//        this.save_to_db();
//        return this;
    },


  });

//  var _order_super = models.Order.prototype;
//  models.Order = models.Order.extend({
//    export_as_JSON: function () {
//      var json = _order_super.prototype.export_as_JSON.apply(
//        this,
//        arguments
//      );
//      json.tiquet_cf = '00012-000220724';
//      json.hasarcf_ok = true;
//      return json;
//    },
//    init_from_JSON: function (json) {
//      _order_super.prototype.init_from_JSON.apply(this, arguments);
//      this.tiquet_cf = json.tiquet_cf;
//      this.hasarcf_ok = json.hasarcf_ok;
//    },
//  });


});
