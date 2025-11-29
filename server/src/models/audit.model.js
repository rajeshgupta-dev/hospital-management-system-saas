import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    action: {
      type: String,
      required: true,
      enum: ["LOGIN", "CREATE", "UPDATE", "DELETE", "VIEW", "EMAIL_SENT"]
    },

    resourceType: {
      type: String,
      required: true
    },

    resourceId: {
      type: String,
      required: true
    },

    meta: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

auditSchema.index({ tenantId: 1, createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditSchema);

export default AuditLog;
