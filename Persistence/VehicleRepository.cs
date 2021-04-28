using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.Persistence
{
  public class VehicleRepository : IVehicleRepository
  {
    private readonly VegaDbContext context;
    public VehicleRepository(VegaDbContext context)
    {
      this.context = context;

    }

    public Vehicle GetVehicle(int id, bool includeRelated = true) 
    {
      if (!includeRelated) 
        return context.Vehicles.SingleOrDefault(v => v.Id == id);
      
      return context.Vehicles
      .Include(v => v.Model)
      .ThenInclude(v => v.Make)
      .Include(v => v.Features)
      .ThenInclude(vf => vf.Feature)
      .SingleOrDefault(v => v.Id == id);
    }

    public IEnumerable<Vehicle> GetVehicles() 
    {
      return context.Vehicles
        .Include(v => v.Model)
        .ThenInclude(v => v.Make)
        .Include(v => v.Features)
        .ThenInclude(vf => vf.Feature)
        .ToList();

    }

    public void Add(Vehicle vehicle)
    {
      context.Add(vehicle);
    }

    public void Remove(Vehicle vehicle)
    {
      context.Remove(vehicle);
    }

  }
}
