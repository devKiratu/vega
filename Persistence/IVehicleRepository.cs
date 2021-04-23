using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
      Vehicle GetVehicle(int id, bool includeRelated = true);
      void Add(Vehicle vehicle);
      void Remove(Vehicle vehicle);
  }
}
