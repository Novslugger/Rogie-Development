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
    
    public partial class AF_QIG_Val
    {
        public int AF_QIG_ValId { get; set; }
        public int AF_ParamId { get; set; }
        public int AF_LotId { get; set; }
        public int AF_QIGTypeId { get; set; }
        public int AFCW { get; set; }
        public int AF_QIGHourId { get; set; }
        public Nullable<int> AFQIG_pcs { get; set; }
        public Nullable<int> AFQIG_Other_pcs { get; set; }
        public Nullable<System.DateTime> AF_ProductionDate { get; set; }
    
        public virtual AF_CastingWheel AF_CastingWheel { get; set; }
        public virtual AF_Lot AF_Lot { get; set; }
        public virtual AF_Param AF_Param { get; set; }
        public virtual AF_QIGHour AF_QIGHour { get; set; }
    }
}
