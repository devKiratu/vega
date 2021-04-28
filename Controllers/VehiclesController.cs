using System;
using System.Collections.Generic;
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
    private readonly IVehicleRepository repository;
    private readonly IUnitOfWork unitOfWork;
    public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork;
      this.repository = repository;
      this.mapper = mapper;

    }

    [HttpPost]
    public IActionResult CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
      vehicle.LastUpdate = DateTime.Now;
      repository.Add(vehicle);
      unitOfWork.Complete();

      //this code is here to return full vehicle object after creation instead of a SaveVehicleResource object
      //it resets the created resource in memory to include all features
      vehicle = repository.GetVehicle(vehicle.Id);

      return Ok(mapper.Map<Vehicle, VehicleResource>(vehicle));
    }

    [HttpPut("{id}")]
    public IActionResult UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
    {
      var vehicle = repository.GetVehicle(id);
      if (vehicle == null)
      {
        ModelState.AddModelError("VehicleId", "Invalid Vehicle Id");
        return NotFound(ModelState);
      }

      var vehicleFromDb = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
      vehicle.LastUpdate = DateTime.Now;
      unitOfWork.Complete();

      vehicleFromDb = repository.GetVehicle(vehicleFromDb.Id);

      var result = mapper.Map<Vehicle, VehicleResource>(vehicleFromDb);

      return Ok(result);

    }

    [HttpDelete("{id}")]
    public IActionResult DeleteVehicle(int id)
    {
      var vehicle = repository.GetVehicle(id, includeRelated: false);

      if (vehicle == null)
      {
        return NotFound();
      }
      repository.Remove(vehicle);
      unitOfWork.Complete();

      return Ok(id);

    }

    [HttpGet] 
    public IActionResult GetVehicles(FilterResource filterResource) 
    {
      var filter = mapper.Map<FilterResource, Filter>(filterResource);
      var vehicle = repository.GetVehicles(filter);
      var vehicleList = mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicle);

      return Ok(vehicleList);
    }

    [HttpGet("{id}")]
    public IActionResult GetVehicle(int id)
    {
      var vehicle = repository.GetVehicle(id);

      if (vehicle == null)
      {
        return NotFound();
      }

      var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

      return Ok(result);

    }

  }
}
