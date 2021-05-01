using System.Collections.Generic;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
      Vehicle GetVehicle(int id, bool includeRelated = true);
      IEnumerable<Vehicle> GetVehicles(VehicleQuery queryObj);
   
    void Add(Vehicle vehicle);
      void Remove(Vehicle vehicle);
  }
}
