using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
  public class FeaturesController : Controller
  {
    private readonly VegaDbContext context;
    private readonly IMapper mapper;
    public FeaturesController(VegaDbContext context, IMapper mapper)
    {
      this.mapper = mapper;
      this.context = context;

    }

    [HttpGet("api/features")]
    public IEnumerable<KeyValuePairResource> GetFeatures() 
    {
      var features = context.Features.ToList();

      return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);

    }

  }
}
