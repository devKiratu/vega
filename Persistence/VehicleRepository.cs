using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
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

    //sorting
    if (queryObj.SortBy == "make") {
        query = queryObj.IsSortAscending ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);
      }
    if (queryObj.SortBy == "model") {
        query = queryObj.IsSortAscending ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);
      }
    if (queryObj.SortBy == "contactName") {
        query = queryObj.IsSortAscending ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);
      }

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
