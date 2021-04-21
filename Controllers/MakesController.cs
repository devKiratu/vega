using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Models;
using vega.Persistence;
using AutoMapper;
using vega.Controllers.Resources;

namespace vega.Controllers
{
  public class MakesController : Controller
  {
    private readonly VegaDbContext context;
    private readonly IMapper mapper;
    public MakesController(VegaDbContext context, IMapper mapper)
    {
      this.mapper = mapper;
      this.context = context;

    }

    [HttpGet("api/makes")]
    public async Task<IEnumerable<MakeResource>> GetMakesAsync()
    {
      var makes = await context.Makes.Include(m => m.Models).ToListAsync();

      return mapper.Map<List<Make>, List<MakeResource>>(makes);
    }

  }
}
