using System.ComponentModel.DataAnnotations;

namespace Demo.Server.Data
{
    public class SomeObject
    {
        public string SomeName { get; set; }
        [Required]
        public SomeInnerObject Inner { get; set; }
    }

    public class SomeInnerObject
    {
        public string InnerName { get; set; }
    }
}
