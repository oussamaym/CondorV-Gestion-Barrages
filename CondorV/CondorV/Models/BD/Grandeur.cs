using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public class Grandeur
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string? NomGrandeur { get; set; }
        public string? NomAbrege { get; set; }
        public string? NomComplet { get; set; }

        public long TypeGrandeurId { get; set; }
        public TypeGrandeur? TypeGrandeur {get;set;}
        public string? Unite { get; set; }
        public int? LocalisationBarrId { get; set; }
        //[JsonIgnore]
        public LocalisationBarr? LocalisationBarr { get; set; }
        public string? ModeAcquisition { get; set; }
        public string? FrequenceMesure { get; set; }
        public int? PrecisionMesure { get; set; }
        public double? CoordonneeX { get; set; }
        public double? CoordonneeY { get; set; }
        public double? CoordonneeZ { get; set; }
        public int? Minimum { get; set; }
        public int? Maximum { get; set; }
        public int? ValeurDexclusion { get; set; }
        public double? ProcessorId { get; set; }
        public double? ProcessorUnitId { get; set; }
        public string? ProcessorName { get; set; }
        public int? NumberDecimalDigits { get; set; }
        public double? CodeAppareil { get; set; }
        public float? HeureMBI { get; set; }
        public float? DateMBI { get; set; }
        public float? ValeurMBI { get; set; }
        public string? PiezomPlusProche { get; set; }
        public long? LectureDeBase { get; set; }
        public double? Longueur { get; set; }
        public double? Ancre { get; set; }
        public double? Calibre { get; set; }
        public double? KlCalibrage { get; set; }
        public float? LineaireZero { get; set; }
        public long? SiteId { get; set; }
        [JsonIgnore]
        public ICollection<Mesure>? Mesures { get; set; }
        //[JsonIgnore]
        public Site? Site { get; set; }
    }
}
