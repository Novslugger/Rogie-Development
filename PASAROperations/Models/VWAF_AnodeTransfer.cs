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
    
    public partial class VWAF_AnodeTransfer
    {
        public int AF_AnodeTransferId { get; set; }
        public System.DateTime AF_Date { get; set; }
        public int AF_LotId { get; set; }
        public Nullable<int> AFLotNo { get; set; }
        public Nullable<int> AF_Sales { get; set; }
        public Nullable<int> AF_APMRejToCF { get; set; }
        public Nullable<int> AF_InvToCF { get; set; }
        public string MonthYear { get; set; }
        public int AF_CustomerId { get; set; }
        public string AF_CustomerName { get; set; }
    }
}
