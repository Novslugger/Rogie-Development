//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PASAROperations.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AF_Num
    {
        public AF_Num()
        {
            this.AF_Lot = new HashSet<AF_Lot>();
        }
    
        public int AF_NumId { get; set; }
        public string AFNum { get; set; }
        public int ProdYearId { get; set; }
    
        public virtual ICollection<AF_Lot> AF_Lot { get; set; }
        public virtual ProdYear ProdYear { get; set; }
    }
}
