import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function Popup({ title, content, button, onAgree, onDisagree, open = false }) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleAgree = () => {
    setIsOpen(false);
    onAgree();
  };

  const handleDisagree = () => {
    setIsOpen(false);
    onDisagree();
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="popup-title" aria-describedby="popup-content">
      {title && <DialogTitle id="popup-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="popup-content">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>{button.cancel}</Button>
        <Button onClick={handleAgree} autoFocus>
          {button.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  button: PropTypes.any,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func,
  open: PropTypes.bool
};
