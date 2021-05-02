using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Extensions;
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

    public IEnumerable<Vehicle> GetVehicles(VehicleQuery queryObj) 
    {
      var query = context.Vehicles
        .Include(v => v.Model)
        .ThenInclude(v => v.Make)
        .Include(v => v.Features)
        .ThenInclude(vf => vf.Feature)
        .AsQueryable();

     //filtering
      if (queryObj.MakeId.HasValue) {
        query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);
      }

      var sortingMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
      {
        ["make"] = v => v.Model.Make.Name,
        ["model"] = v => v.Model.Name,
        ["contactName"] = v => v.ContactName,
      };
      //sorting
      query = query.ApplySorting(queryObj, sortingMap);

      return query.ToList();

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
