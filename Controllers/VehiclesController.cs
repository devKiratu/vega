using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
  [Route("/api/vehicles")]
  public class VehiclesController : Controller
  {
    private readonly IMapper mapper;
    private readonly VegaDbContext context;
    public VehiclesController(IMapper mapper, VegaDbContext context)
    {
      this.context = context;
      this.mapper = mapper;

    }

    [HttpPost]
    public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
    {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      /*
      This is extra/unnecessary since client for this endpoint is a frontend app. The first validation is enough. This however stays here for learning purposes
      */
      var result = context.Models.Find(vehicleResource.ModelId);
      if (result == null) {
        ModelState.AddModelError("ModelId", "Invalid ModelId");
        return BadRequest(ModelState);
      }

      var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
      vehicle.LastUpdate = DateTime.Now;
      context.Vehicles.Add(vehicle);
      context.SaveChanges();


      return Ok(mapper.Map<Vehicle, VehicleResource>(vehicle));
    }

  }
}
