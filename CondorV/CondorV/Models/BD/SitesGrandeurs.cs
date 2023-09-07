namespace CondorV.Models.BD
{
    public class SitesGrandeurs
    {
        public long SiteId { get; set; }
        public Site? Site { get; set; }
        public long TypeGrandeurId { get; set; }
        public TypeGrandeur? TypeGrandeur { get; set; }
    }
}
