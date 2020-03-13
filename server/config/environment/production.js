'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://naotimetrack:gmWYFsihKEeskE8sbDn413SzqPzlpp5HbdPQI44UvWZt2A5lFEPaXdBzDgVIdlqUINLHtKPoGtgLA98yIABSXQ%3D%3D@naotimetrack.mongo.cosmos.azure.com:10255/?ssl=true&appName=@naotimetrack@'
  }
};