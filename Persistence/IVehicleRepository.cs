using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
      public Vehicle GetVehicle(int id);
    }
}
