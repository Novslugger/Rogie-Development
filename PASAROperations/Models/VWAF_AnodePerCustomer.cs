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
    
    public partial class VWAF_AnodePerCustomer
    {
        public int AF_AnodePerCustomerId { get; set; }
        public int AF_LotId { get; set; }
        public int AF_CWId { get; set; }
        public int AF_CustomerId { get; set; }
        public string AF_CustomerName { get; set; }
        public int AF_Customer_Total { get; set; }
        public Nullable<int> AF_CustomerId_Othr { get; set; }
        public Nullable<int> AF_CustomerId_Othr_Total { get; set; }
        public string AF_CustomerNameOther { get; set; }
    }
}