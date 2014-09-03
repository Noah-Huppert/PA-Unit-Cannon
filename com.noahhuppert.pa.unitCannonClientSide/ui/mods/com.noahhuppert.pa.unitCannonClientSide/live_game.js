var prevUnitData = handlers.unit_data;

var Ustart = /[^\/]*$/;  // ^ : start , \/ : '/', $ : end // as wildcard: /*.json
var Uend = /[.]json[^\/]*$/;

function UsiconFor(id) {
    return id.substring(id.search(Ustart), id.search(Uend));
}

function UUnitDetailModel(givenOptions) {
    var options = givenOptions || {};

    var self = this;
    self.name = ko.observable(options.name);
    self.desc = ko.observable(options.description);
    self.cost = ko.observable(options.cost);

    self.damage = ko.observable(options.damage);
    self.fireRate = ko.observable(options.rate_of_fire);

    self.buildPower = ko.observable(options.build_arm_power);
    self.buildEfficency = ko.observable(options.build_arm_cost ? options.build_arm_power / options.build_arm_cost : null);

    if (self.buildEfficency() && self.buildEfficency().toFixed)
        self.buildEfficency(self.buildEfficency().toFixed(3));

    self.sicon = ko.observable(options.sicon);
    self.siconUrl = ko.observable('coui://ui/main/atlas/icon_atlas/img/strategic_icons/icon_si_' + options.sicon + '.png');
}

handlers.unit_data = function(payload){
  prevUnitData(payload);

  console.log("Unit Cannon inject ammo");
  var unit_cannon_ammo_id = "/pa/units/land/unit_cannon/unit_cannon_ammo.json";

  model.itemDetails[unit_cannon_ammo_id] = new UUnitDetailModel({
    name: "Orbital Drop Pod",
    description: "Orbital Drop Pod- Long range unit transport",
    cost: 1000,
    sicon: UsiconFor("/pa/units/land/nuke_launcher/nuke_launcher_ammo.json")
  });
};
