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
    
    public partial class AF_Target_Default
    {
        public AF_Target_Default()
        {
            this.AF_Lot_Target = new HashSet<AF_Lot_Target>();
            this.AF_Param_Num_TargetVal = new HashSet<AF_Param_Num_TargetVal>();
        }
    
        public int AF_Target_DefaultId { get; set; }
        public string TargetName { get; set; }
        public bool TargetType { get; set; }
    
        public virtual ICollection<AF_Lot_Target> AF_Lot_Target { get; set; }
        public virtual ICollection<AF_Param_Num_TargetVal> AF_Param_Num_TargetVal { get; set; }
    }
}
