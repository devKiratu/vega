using System;
using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
  [Route("api/vehicles/{vehicleId}/photos")]
  public class PhotosController : Controller
  {
    private readonly IVehicleRepository repository;
    private readonly IWebHostEnvironment host;
    private readonly IUnitOfWork unitOfWork;
    private readonly IMapper mapper;

    public PhotosController(IWebHostEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
    {
      this.mapper = mapper;
      this.unitOfWork = unitOfWork;
      this.host = host;
      this.repository = repository;

    }
    [HttpPost]
    public IActionResult UploadPhoto(int vehicleId, IFormFile file)
    {
      //check if vehicle exists
      var vehicle = repository.GetVehicle(vehicleId, includeRelated: false);
      if (vehicle == null) return NotFound();

      //establish path for saving photos
      var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");

      //create the folder if it doesn't exist
      if (!Directory.Exists(uploadsFolderPath)) Directory.CreateDirectory(uploadsFolderPath);

      //Generate a new file name for security reasons & set its path in uploads folder
      var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
      var filePath = Path.Combine(uploadsFolderPath, fileName);

      // use a stream to read input file and store it in the file system
      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        file.CopyTo(stream);
      }

      //generate thumbnail

      //update database => create photo object, add to vehicle and save to db
      var photo = new Photo() { FileName = fileName };
      vehicle.Photos.Add(photo);
      unitOfWork.Complete();

      //map response to photoResource
      var result = mapper.Map<Photo, PhotoResource>(photo);

      return Ok(result);
    }
  }
}
