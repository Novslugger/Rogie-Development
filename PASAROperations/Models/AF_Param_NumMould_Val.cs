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
    
    public partial class AF_Param_NumMould_Val
    {
        public int AF_Param_NumMould_ValId { get; set; }
        public int AF_MouldNo { get; set; }
        public int AF_WheelNo { get; set; }
        public int AF_MouldStatus { get; set; }
        public int AF_LotId { get; set; }
        public int AF_ParamId { get; set; }
    
        public virtual AF_Lot AF_Lot { get; set; }
        public virtual AF_Param AF_Param { get; set; }
    }
}
