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
    
    public partial class RTDUET_EVENTS_LVL3to7_FTP_Result
    {
        public string ReasonDisplayTextLVL03 { get; set; }
        public string ReasonDisplayTextLVL04 { get; set; }
        public string ReasonDisplayTextLVL05 { get; set; }
        public string ReasonDisplayTextLVL06 { get; set; }
        public string ReasonDisplayTextLVL07 { get; set; }
        public Nullable<System.DateTime> EFStartTime { get; set; }
        public Nullable<System.DateTime> EFEndTime { get; set; }
        public Nullable<double> EFDuration { get; set; }
        public Nullable<int> EFDuration_Second { get; set; }
        public string RootCategory { get; set; }
        public string Discipline { get; set; }
        public string Eventtype { get; set; }
        public string Comment { get; set; }
        public Nullable<double> Average { get; set; }
        public Nullable<double> TargetVal { get; set; }
        public Nullable<double> EqDowntime { get; set; }
    }
}
