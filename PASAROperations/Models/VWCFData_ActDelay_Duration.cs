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
    
    public partial class VWCFData_ActDelay_Duration
    {
        public int CycleId { get; set; }
        public int ActivityCodeId { get; set; }
        public string ActivityCodeName { get; set; }
        public string ActivityDesc { get; set; }
        public Nullable<double> ActDuration { get; set; }
        public int StageId { get; set; }
    }
}