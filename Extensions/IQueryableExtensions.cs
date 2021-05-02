using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using vega.Models;

namespace vega.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, IQueryObj queryObj,  Dictionary<string, Expression<Func<T, object>>> sortingMap)
         {
            if (!string.IsNullOrWhiteSpace(queryObj.SortBy) && sortingMap.ContainsKey(queryObj.SortBy)) {
            return query = queryObj.IsSortAscending
            ? query.OrderBy(sortingMap[queryObj.SortBy]) 
            : query.OrderByDescending(sortingMap[queryObj.SortBy]);
            } else {
            return query;
            }

        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObj queryObj)
        {
            if (queryObj.Page <=0) 
            {
              queryObj.Page = 1;
            }
            if (queryObj.PageSize <=0 ) 
            {
              queryObj.PageSize = 10;
            }
            return query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }
    }

}
