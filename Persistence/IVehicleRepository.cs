using System.Collections.Generic;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
      Vehicle GetVehicle(int id, bool includeRelated = true);
      QueryResult<Vehicle> GetVehicles(VehicleQuery queryObj);
      IEnumerable<Photo> GetPhotos(int id);

    void Add(Vehicle vehicle);
      void Remove(Vehicle vehicle);
  }
}
