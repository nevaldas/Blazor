using System.ComponentModel.DataAnnotations;

namespace Demo.WebAssembly.Models
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
