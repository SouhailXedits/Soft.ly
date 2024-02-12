function Logo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div>
      <img
        className={` ${isCollapsed ? " w-[32px]" : "w-[150px]"}  m-3`}
        src={isCollapsed ? "/logo-taki-collapsed.png" : `/logo-taki.png`}
        alt="softly logo"
      />
    </div>
  );
}

export default Logo;
