using System;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public IActionResult CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      /*
      This is extra/unnecessary since client for this endpoint is a frontend app. The first validation is enough. This however stays here for learning purposes
      */
      var result = context.Models.Find(vehicleResource.ModelId);
      if (result == null)
      {
        ModelState.AddModelError("ModelId", "Invalid ModelId");
        return BadRequest(ModelState);
      }


      var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
      vehicle.LastUpdate = DateTime.Now;
      context.Vehicles.Add(vehicle);
      context.SaveChanges();

      //this code is here to return full vehicle object after creation instead of a SaveVehicleResource object
      //it resets the created resource in memory to include all features
      vehicle = context.Vehicles
      .Include(v => v.Model)
      .ThenInclude(v => v.Make)
      .Include(v => v.Features)
      .ThenInclude(vf => vf.Feature)
      .SingleOrDefault(v => v.Id == vehicle.Id);

      return Ok(mapper.Map<Vehicle, VehicleResource>(vehicle));
    }

    [HttpPut("{id}")]
    public IActionResult UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
    {
      var vehicle = context.Vehicles.Include(v => v.Features).SingleOrDefault(v => v.Id == id);
      if (vehicle == null)
      {
        ModelState.AddModelError("VehicleId", "Invalid Vehicle Id");
        return NotFound(ModelState);
      }

      var vehicleFromDb = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
      vehicle.LastUpdate = DateTime.Now;
      context.SaveChanges();

       vehicleFromDb = context.Vehicles
      .Include(v => v.Model)
      .ThenInclude(v => v.Make)
      .Include(v => v.Features)
      .ThenInclude(vf => vf.Feature)
      .SingleOrDefault(v => v.Id == vehicleFromDb.Id);

      var result = mapper.Map<Vehicle, VehicleResource>(vehicleFromDb);

      return Ok(result);

    }

    [HttpDelete("{id}")]
    public IActionResult DeleteVehicle(int id)
    {
      var vehicle = context.Vehicles.SingleOrDefault(v => v.Id == id);

      if (vehicle == null)
      {
        return NotFound();
      }
      context.Vehicles.Remove(vehicle);
      context.SaveChanges();

      return Ok(id);

    }

    [HttpGet("{id}")]
    public IActionResult GetVehicle(int id)
    {
      var vehicle = context.Vehicles
      .Include(v => v.Model)
      .ThenInclude(v => v.Make)
      .Include(v => v.Features)
      .ThenInclude(vf => vf.Feature)
      .SingleOrDefault(v => v.Id == id);
     
      if (vehicle == null) {
        return NotFound();
      }

      var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

      return Ok(result);

    }

  }
}
