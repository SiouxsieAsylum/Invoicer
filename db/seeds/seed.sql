INSERT INTO contacts (name,email,owed,service,contractor) VALUES('Buzz Lightyear','infinityandbeyond@yahoo.com',1000,'website construction',1),
  ('Woody','youareatoy@howdy.com',200,'app maintainance',1),
  ('Bo Peep','countingsheep@yahoo.com',500,'app maintainance',1),
  ('Rex','madebymattelbutnotreally@gmail.com',1000,'website maintainance',2),
  ('Slinky','wheresmyotherhalf@gmail.com',1000,'website construction',2);

INSERT INTO templates (name,template) VALUES
('first request','Hello {this.props.contact.name},
 I hope this email finds you well. This is a first requisition for payment on the {this.props.contact.service} performed on {this.props.contact.date_of_service}. The current balance owed is {this.props.contact.owed}. Please reach out to me if you need me to resend my paypal link or if you have any questions. ');
