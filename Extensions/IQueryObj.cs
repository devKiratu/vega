namespace vega.Extensions
{
    public interface IQueryObj
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
        int Page { get; set; }
        int PageSize { get; set; }
  }
}
