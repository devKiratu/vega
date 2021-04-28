using System.Collections.Generic;
using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
      Vehicle GetVehicle(int id, bool includeRelated = true);
      IEnumerable<Vehicle> GetVehicles();
      void Add(Vehicle vehicle);
      void Remove(Vehicle vehicle);
  }
}
