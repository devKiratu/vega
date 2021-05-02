using vega.Extensions;

namespace vega.Models
{
    public class VehicleQuery : IQueryObj
    {
        public int? MakeId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
    }
}
