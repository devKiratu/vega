namespace vega.Persistence
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly VegaDbContext context;
    public UnitOfWork(VegaDbContext context)
    {
      this.context = context;
    }

    public void Complete()
    {
      context.SaveChanges();
    }

  }
}
