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
    
    public partial class VWAF_MouldReplacement
    {
        public int AF_MouldReplacementId { get; set; }
        public int AF_CastingWheel { get; set; }
        public int AF_MouldPosition { get; set; }
        public int AF_LotId { get; set; }
        public Nullable<int> AFLotNo { get; set; }
        public int AF_CustomerId { get; set; }
        public string AF_CustomerName { get; set; }
        public int AF_MouldReplacement_ReasonId { get; set; }
        public string AF_MouldReplacement_Reason { get; set; }
    }
}